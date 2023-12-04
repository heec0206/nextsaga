import { useEffect, useState, useRef } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-chartjs-2";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const LineChartComponent = (props) => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ChartDataLabels,
  );

  console.log(props.data);

  const chart = {
    options : {
      responsive: true,
      maxBarThickness: 80,
      animation:true,
      //aspectRatio:3,
      tension: 0.2,
      maintainAspectRatio: false,
      interaction: {
        //mode: "index",
      },
      hoverBackgroundColor: "",
      scales: {
        x: {
          axis: "x",
          //beginAtZero: true,
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.1;
          },
          ticks: {
            color: "#2E2E2E",
            font: {
              weight: "normal",
              color: "#D3D3D3",
              size: 14,
            },
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
        y: {
          axis: "y",
          beginAtZero: true,
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.1;
          },
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
          },
          ticks: {
            color: "#2E2E2E",
            font: {
              weight: "normal",
              color: "#D3D3D3",
              size: 14,
            },
            padding: 20,
          },
          title: {
            text:"매출 건수",
            display: true,
            color: "#6E6E6E",
            font: {
              size: 16,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
        },
        y2: {
          axis: "y",
          afterDataLimits: (scale) => {
            scale.max = scale.max * 1.1;
          },
          ticks: {
            color: "#2E2E2E",
            font: {
              weight: "normal",
              color: "#D3D3D3",
              size: 14,
            },
            padding: 20,
          },
          beginAtZero: true,
          position: 'right',
          title: {
            text:"매출액",
            display: true,
            color: "#6E6E6E",
            font: {
              size: 16,
              weight: "bold",
              lineHeight: 1.2,
            },
            padding: { top: 20, left: 0, right: 0, bottom: 0 },
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          //backgroundColor: "#2F4F4F",
        },
        datalabels: {
          formatter: (value) => new Intl.NumberFormat("ko").format(value),
          display: "auto",
          align: "end",
          anchor: "end",
          display: function (ctx) {
            return true
          },
          offset: function (context) {
            return context.dataset.type === "bar" ? -26 : 5;
          },
          color: function (context) {
            return context.dataset.type === "bar" ? "white" : "gray";
          },
          backgroundColor: function (context) {
            return context.dataset.type === "bar"
              ? "rgba(0, 0, 0, 0.3)"
              : "rgba(255, 255, 255, 1)";
          },
          borderRadius: 4,
          padding: {
            top: 2,
            bottom: 2,
            left: 6,
            right: 6,
          },
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    data : {
      labels : [ "1","2","3" ],
      datasets : [{
          yAxisID: "y",
          type: 'line',
          label: "매출 건수",
          data: [123,123,123],
          backgroundColor: "green",
          borderColor: "green"
        },
        {
          yAxisID: "y2",
          type: 'bar',
          label: "매출액",
          data: [ 1000,1000,1000 ],
          backgroundColor: "#a1a1a1",
          hoverBackgroundColor : "#a1a1a1",
          borderColor: "#a1a1a1",
        }
      ]
    }
  };
  
  return (
    <>
      <Chart type="line" options={chart.options} data={chart.data} />
    </>
  )
}

export default LineChartComponent;

LineChartComponent.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
