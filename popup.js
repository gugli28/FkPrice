
import { getActiveTabURL } from "./utils.js";
import { getPricePoints } from "./utils.js";


// loaded when a popup.html is loaded
// html page has the link for this javascript file.
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const lid = urlParameters.get("lid");

  if (activeTab.url.includes("flipkart.com") && lid) {

   
    const data = await getPricePoints(lid);

    loadChart3(data);
  

  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML = '<div class="title">This is not a Flipkart page.</div>';
    const activeTab = getPricePoint();
    console.log("activeTab", activeTab);
  }
});


// to use this data has to be passed accordingly

const loadChart =  (xAxisData, yAxisData) => {
  const priceDivElement = document.createElement("div");

      console.log("-------xAxisData", xAxisData);
      console.log("-------yAxisData", yAxisData);
      console.log("-------LOADING CHART");
      const myCanvas = document.createElement("canvas");
      priceDivElement.appendChild(myCanvas)
      
      const ctx = myCanvas.getContext("2d");
      // var ctx;
      ctx.canvas.width = 600;
      ctx.canvas.height = 200;

      const config = {
        type: 'line',
        data: {
          // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          labels: xAxisData,
          datasets: [{
              label: 'Price of Listing',
              // data: [12, 19, 3, 5, 2, 3],
              data: yAxisData,
              borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'linear',
            }],
            y: {
              beginAtZero: true
              }
          }
        }
    };
    new Chart(ctx, config);
    console.log("-------LOADED CHART");
    

      // youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      let pricePoint = document.getElementsByClassName("bookmarks")[0]
      // youtubePlayer = document.getElementsByClassName('video-stream')[0];

      // youtubeLeftControls.appendChild(bookmarkBtn);
      // pricePoint.appendChild(bookmarkBtn)
      pricePoint.appendChild(priceDivElement)

      // bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
};


const loadChart2 =  (data) => {
  const priceDivElement = document.createElement("div");

      console.log("-------LOADING CHART");
      const myCanvas = document.createElement("canvas");
      priceDivElement.appendChild(myCanvas)
      
      const ctx = myCanvas.getContext("2d");
      const config = {
        type: 'line',
        data: {
        
          labels: [],
          datasets: [{
              label: 'Price of Listing',
              data: data,
              borderColor: "#3e95cd",
              fill: false

          }]
        },
        options: {
          // check how to pass the scale. On uncommenting below getting errors w/o any impact on canvas.
          // scales: {
          //   x: [{
          //     type: 'time',
          //     distribution: 'linear',
          //   }]
          // }
        }
    };
    new Chart(ctx, config);
    console.log("-------LOADED CHART");
  
      let pricePoint = document.getElementsByClassName("chartDiv")[0]
      pricePoint.appendChild(priceDivElement)

};


/**
 * this loads canvas with the data points and the the color of the dataPoints
 *
 */
const loadChart3 =  (dataAndColor) => {
  const priceDivElement = document.createElement("div");

      // console.log("-------LOADING CHART");
      const myCanvas = document.createElement("canvas");
      priceDivElement.appendChild(myCanvas)
      
      const ctx = myCanvas.getContext("2d");
      const config = {
        type: 'line',
        data: {
        
          labels: [],
          datasets: [{
              label: 'Price of Listing',
              data: dataAndColor[0],
              borderColor: dataAndColor[1],
              fill: true

          }]
        },
        options: {
          // check how to pass the scale. On uncommenting below getting errors w/o any impact on canvas.
          // scales: {
          //   x: [{
          //     type: 'time',
          //     distribution: 'linear',
          //   }]
          // }
        }
    };
    new Chart(ctx, config);
    // console.log("-------LOADED CHART");
  
      let pricePoint = document.getElementsByClassName("chartDiv")[0]
      pricePoint.appendChild(priceDivElement)

};