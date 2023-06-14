import sys
sys.path.append('./')

import os
import re
from typing import List, Optional, Tuple, Union

import click
import dnnlib
import numpy as np
import PIL.Image
import torch
from tqdm import tqdm


import legacy
from camera_utils import LookAtPoseSampler

from matplotlib import pyplot as plt

from pathlib import Path

import json

from training.utils import color_mask, color_list

from tqdm import tqdm

import imageio

import argparse

def init_conditional_dataset_kwargs(data, mask_data, data_type, resolution=None):
    try:
        if data_type =='seg':
            dataset_kwargs = dnnlib.EasyDict(class_name='training.dataset.ImageSegFolderDataset', path=data, mask_path=mask_data, data_type=data_type, use_labels=True, max_size=None, xflip=False)
            dataset_obj = dnnlib.util.construct_class_by_name(**dataset_kwargs) # Subclass of training.dataset.Dataset.
            dataset_kwargs.resolution = dataset_obj.resolution # Be explicit about resolution.
            dataset_kwargs.use_labels = dataset_obj.has_labels # Be explicit about labels.
            dataset_kwargs.max_size = len(dataset_obj) # Be explicit about dataset size.
            return dataset_kwargs, dataset_obj.name
        elif data_type == 'edge':
            dataset_kwargs = dnnlib.EasyDict(class_name='training.dataset.ImageEdgeFolderDataset', path=data, mask_path=mask_data, data_type=data_type, use_labels=True, max_size=None, xflip=False)
            dataset_obj = dnnlib.util.construct_class_by_name(**dataset_kwargs) # Subclass of training.dataset.Dataset.
            dataset_kwargs.resolution = dataset_obj.resolution # Be explicit about resolution.
            dataset_kwargs.use_labels = dataset_obj.has_labels # Be explicit about labels.
            dataset_kwargs.max_size = len(dataset_obj) # Be explicit about dataset size.
            return dataset_kwargs, dataset_obj.name
        else:
            raise click.ClickException(f'Unknown data_type: {data_type}')
    except IOError as err:
        raise click.ClickException(f'--data: {err}')

def render_video(G, ws, intrinsics, num_frames = 120, pitch_range = 0.25, yaw_range = 0.35, neural_rendering_resolution = 128, device='cpu'):
    frames, frames_label = [], []

    for frame_idx in tqdm(range(num_frames)):
        cam2world_pose = LookAtPoseSampler.sample(3.14/2 + yaw_range * np.sin(2 * 3.14 * frame_idx / num_frames),
                                                3.14/2 -0.05 + pitch_range * np.cos(2 * 3.14 * frame_idx / num_frames),
                                                torch.tensor(G.rendering_kwargs['avg_camera_pivot'], device=device), radius=G.rendering_kwargs['avg_camera_radius'], device=device)
        pose = torch.cat([cam2world_pose.reshape(-1, 16), intrinsics.reshape(-1, 9)], 1)
        with torch.no_grad():
            out = G.synthesis(ws, pose, noise_mode='const', neural_rendering_resolution=neural_rendering_resolution)
        # frames.append(((out['image'].cpu().numpy()[0] + 1) * 127.5).clip(0, 255).astype(np.uint8).transpose(1, 2, 0))
        # image_color = ((out['image'][0].permute(1, 2, 0).cpu().numpy().clip(-1, 1) + 1) * 127 with current request settings.
        image_color = ((out['image'][0].permute(1, 2, 0).cpu().numpy().clip(-1, 1) + 1) * 127.5).astype(np.uint8)
        image_mask = (out['mask'][0].cpu().numpy().clip(0, 1) * 255).astype(np.uint8)
        frames.append(image_color.transpose(2, 0, 1))
        frames_label.append(image_mask)

    return frames, frames_label

def save_video(frames: List[np.ndarray], frames_label: List[np.ndarray], output_path: str, fps: int):
    with imageio.get_writer(output_path, format='mp4', mode='I', fps=fps) as writer:
        for frame, frame_label in zip(frames, frames_label):
            frame_rgb = np.transpose(frame, (1, 2, 0))
            writer.append_data(frame_rgb)

    print(f"Video saved successfully to {output_path}")

@click.command()
@click.option('--network', 'network_pkl', help='Network pickle filename', required=True)
@click.option('--output', 'output_path', help='Output video path', required=True)
@click.option('--num-frames', help='Number of frames to render', type=int, default=120)
@click.option('--pitch-range', help='Pitch range for camera motion', type=float, default=0.25)
@click.option('--yaw-range', help='Yaw range for camera motion', type=float, default=0.35)
@click.option('--resolution', help='Neural rendering resolution', type=int, default=128)
@click.option('--device', help='Device to run the code on', type=str, default='cpu')
def main(network_pkl: str, output_path: str, num_frames: int, pitch_range: float, yaw_range: float, resolution: int, device: str):
    assert os.path.isfile(network_pkl), 'Network pickle file does not exist'

    # Load the network
    G = legacy.load_network_pkl(network_pkl)['G_ema'].to(device)

    # Set up the camera intrinsics
    intrinsics = torch.tensor([
        [1.732051, 0, 0],
        [-0.8660254, 1.5, 0],
        [0, 0, 1],
    ], dtype=torch.float32, device=device)

    # Generate the random input for the generator
    ws = torch.randn(num_frames, G.mapping.num_ws, G.mapping.w_dim, device=device)

    # Render the video frames
    frames, frames_label = render_video(G, ws, intrinsics, num_frames, pitch_range, yaw_range, resolution, device)

    # Save the video
    save_video(frames, frames_label, output_path, fps=30)

if __name__ == '__main__':
    main()
