import React from 'react'
import {Line} from 'react-chartjs-2';
import { InfoState } from './Context';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

const Chart = () => {
    const {data,setData} = InfoState();

    const func1=()=>{
        setData([3,6,9,12,20,25,14,6,5,1,23,30])
    }

    const func2=()=>{
        setData([20,6,9,12,30,25,14,6,5,10,13,30])
    }

    const data1 = {
        labels:['Jan','Jan','Jan','Jan','Jan','Jan','Jan','Jan','Jan','Jan','Jan','Jan',],
        datasets:[{
            labels:'Price',
            // data:[3,6,9,12,20,25,14,6,5,1,23,30],
            data:data,
            borderColor:'black',
            pointBorderColor:'red',
            fill:true,
            tension:0.4,
            
        }]

    }


    const options={
        responsive: true,
        plugins: {
          title: {
            display: true,
            // text: 'Chart.js Line Chart'
          },
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            //   text: 'Month'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
            //   text: 'Value'
            }
          }
        }
      }

  return (
    <div style={{width:'700px'}}>
        <Line 
        data={data1}
        options={options}
        >
        </Line>
        <button className='m-4' style={{border:'1px solid black'}} onClick={func1}>next 3 months</button><span><button style={{border:'1px solid black'}} onClick={func2}>prev 3 months</button></span>
    </div>
  )
}

export default Chart