
import { callHPS } from "./client/HpsClient.js";
import { callRTG } from "./client/RTGClient.js";

export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}



export function getHumanreadableTime(timestamp) {

    // Assuming the timestamp is in milliseconds
    // const timestamp = 1696518062958;

    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Extract individual components of the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the date and time as a human-readable string
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Combine the date and time
    const humanReadableTime = `${formattedDate} ${formattedTime}`;

    // console.log(humanReadableTime);
    return humanReadableTime;
}

export async function getAPIResponse(request) {

    let response = await fetch(request.url, 
            { method: 'GET', headers: request.headers } )

    return response.json()
    .then(data => {
        return data;
    })

}

export async function getPostAPIResponse(request) {
    var raw =  JSON.stringify(request.body)

    var requestOptions = {
    method: 'POST',
    headers: request.headers,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(request.url, requestOptions);

    return response.json()
    .then(data => {
        return data;
    })

    // return result;

}


export async function getPricePoints(lid){
    const responseArray = [];
    const hpsResponse = callHPS(lid, responseArray);
    // console.log("testfunc==", lid)
    const rtgResponse = callRTG(lid, responseArray);

    const data =  adaptTimelineToChartData(await hpsResponse, await rtgResponse );
    return data;


}

/**
 * 
 * dataArray: has x,y data points
 * borderColor : has the color of each data points in the same order.
 * 
 * @returns data that is to plotted on the graph
 */

function adaptTimelineToChartData(hpsResponse, rtgResponse ){
    // const timePoints = [];
    // const pricePoints = [];
    // console.log("In loadChartData ======");
    const dataArray = [];
    const dataAndColor = [];
    var borderColor = [];

    //sort here 
    hpsResponse.sort(compare);
    // console.log("SortedhpsResponse==", hpsResponse)
    rtgResponse.sort(compare);
    // console.log("SortedRTGResponse==", rtgResponse)

    for (const res of hpsResponse) {
        // timePoints.push(getHumanreadableTime(res.time));
        // pricePoints.push(res.price);
        dataArray.push({
            x: getHumanreadableTime(res.time),
            y: res.price
          })
        borderColor.push("#3e95cd");
        // console.log("Time", res.time);
        // console.log("price", res.price);
      }
    for (const res of  rtgResponse) {
        // timePoints.push(getHumanreadableTime(res.time));
        // pricePoints.push(res.price);
        dataArray.push({
            x: getHumanreadableTime(res.time),
            y: res.price
          });
        borderColor.push("#FF0000");
    }
    
    dataAndColor.push(dataArray);
    dataAndColor.push(borderColor);
    return dataAndColor;
    // return new ChartData(timePoints, pricePoints)
}

// this is to sort the data on the basis of time(in ms)
function compare( a, b ) {
    if ( a.time < b.time ){
      return -1;
    }
    if ( a.time > b.time ){
      return 1;
    }
    return 0;
  }
  