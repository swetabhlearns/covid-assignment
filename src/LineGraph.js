import React from 'react'
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'


function LineGraph(props) {
  return (
    <Line data ={
      {
        labels: props.label.map(l => l.substr(0,10)),
        datasets: [
          {
            label: "Cases",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: props.yAxis,
          },
        ],
      }
    }  />
  )
}

export default LineGraph
