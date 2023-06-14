
import React from 'react';
import "slick-carousel/slick/slick.css";
import pic1 from './pics/pic1.jpg';
import pic2 from './pics/pic2.jpg';
import pic3 from './pics/pic3.jpeg';
import pic4 from './pics/pic4.jpeg';
import pic5 from './pics/pic5.jpg';
import './style.css';
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CarouselBackground = () => {

  return (
<>

<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    {/* <!-- Carousel indicators --> */}
    <ol class="carousel-indicators">
        <li data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"></li>
        <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
    </ol>

    {/* <!-- Wrapper for carousel items --> */}
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src={pic5} class="d-block w-100" alt="Slide 1"/>
        </div>
        <div class="carousel-item">
            <img src={pic2} class="d-block w-100" alt="Slide 2"/>
        </div>
        <div class="carousel-item">
            <img src={pic1} class="d-block w-100" alt="Slide 3"/>
        </div>
    </div>

    {/* <!-- Carousel controls --> */}
    <a class="carousel-control-prev" href="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>
</div>
</>
  );
}

export default CarouselBackground;

