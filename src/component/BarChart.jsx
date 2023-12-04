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
import * as commonUtils from "/src/utils/common";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const LineChartComponent = ({
  options,
  data,
}) => {
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

  const optionCreateY = options.labels.map((item,idx) => {
    return ({ 
      y : {
        beginAtZero: true,
        stacked: true,
        afterDataLimits: (scale) => {
          scale.max = scale.max * 1.1;
        },
        position: "left",
        ticks: {
          color: "#2E2E2E",
          font: {
            family: "'Noto Sans KR', 'serif'",
            weight: "normal",
            color: "#D3D3D3",
            size: 14,
          },
          padding: 20,
          //display: options.tickY ? options.tickY[idx] : true,
        },
        title: {
          display: options.title 
            ? options.title.display === true ? true : false
            : false,
          text:item,
          color: "#6E6E6E",
          font: {
            size: 16,
            weight: "bold",
            lineHeight: 1.2,
            family: "'Noto Sans KR', 'serif'",
          },
        },
        grid: {
          display: true,
          drawBorder: true,
          drawTicks: true,
        },
      }
    })
  });

  const dataCreateY = data.dataset && data.dataset.map((item,idx) => {
    return {
      //xAxisID: "x"+idx,
      label: options.labels[idx],
      data: item,
      backgroundColor: options.color[idx],
      maxBarThickness: 100,
      stack: 'Stack 0',
      hoverBackgroundColor: options.color[idx],
    }
  })

  const chart = {
    options : {
      responsive: true,
      animation:true,
      tension: 0.2,
      maintainAspectRatio: false,
      //aspectRatio:3,
      interaction: {
        mode: "index",
      },
      hoverBackgroundColor: "",
      scales: {
        x: {
          axis: "x",
          stacked: true,
          beginAtZero: true,
          ticks: {
            color: "#2E2E2E",
            font: {
              family: "'Noto Sans KR', 'serif'",
              weight: "normal",
              color: "#D3D3D3",
              size: 14,
            },
            padding: 15,
            minRotation: 0,
            maxRotation: 0,
          },
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
          },
          //padding: { top: -100, left: 0, right: 0, bottom: -100 },
        },
        ...Object.assign(...optionCreateY)
      },
      plugins: {
        legend: {
          position: "bottom",
          font: {
            family: "'Noto Sans KR', 'serif'",
            size: 14,
            weight: "bold",
          },
        },
        datalabels: {
          formatter: (value) => new Intl.NumberFormat("ko").format(value),
          display: "auto",
          align: "end",
          anchor: "end",
          //clamp: true,
          //clip: true,
          display: function (context) {
            return context.dataset.data[context.dataIndex] !== 0 && true
          },
          offset: function (context) {
            return context.datasetIndex === 0 ? -35 : 5;
          },
          color: function (context) {
            return context.datasetIndex === 0 ? "white" : "white";
          },
          backgroundColor: function (context) {
            return context.datasetIndex === 0 ? options.countColor[0] : options.countColor[1]
          },
          borderRadius: 4,
          padding: {
            top: 2,
            bottom: 2,
            left: 6,
            right: 6,
          },
          font: {
            family: "'Noto Sans KR', 'serif'",
            size: 12,
            weight: "bold",
          },
        },
        tooltip: { 
          backgroundColor: 'rgba(251, 216, 22, 0.9)',
          textColor:"red",
          titleFont: { size: 16, family: "'Noto Sans KR', sans-serif" },
          titleColor: "#222",
          bodyColor: "#222",
          borderWidth:4,
          borderColor:"rgba(239, 200, 19, 1)",
          bodyFont: { 
            font: {
              family: "'Noto Sans KR', sans-serif",
            },
            size:12,
          },
          padding: 16,
          usePointStyle: true,
          titleSpacing:3,
          titleMarginBottom: 10,
          bodySpacing: 6,
          //filter: (item) => console.log(item),
          callbacks: {
            title: (context) => { 
              let title = context[0].label;
              return data.title + "\n" + title;
            },
            label: (context) => { 
              let label = context.dataset.label
              let value = context.dataset.data[context.dataIndex]
              return label + " " + commonUtils.priceStr(value) + " 건";
            },
            /*
            labelColor: function(context) {
              return {
                borderColor: context.dataset.label === props.options.labelY1 ? "green" : "hotpink",
              };
            },
            */
          }
        },
      },
    },
    data : {
      labels : data.labels,
      datasets: dataCreateY
    }
  };

  return (
    <>
      <Chart 
        type="bar" 
        options={chart.options}
        data={chart.data}
      />
    </>
  )
}

export default LineChartComponent;

LineChartComponent.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
