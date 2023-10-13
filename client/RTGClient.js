
import * as utils from ".././utils.js";
import {PricePointResponse} from '../model/response.js';
import * as requestt from '../model/request.js';
export async function callRTG(listingId) {

    var request = requestt.createRTGRequest(listingId);
    const response = await utils.getAPIResponse(request) 

    return parsePricePointjsonData(response);
}



async function parsePricePointjsonData(jsonData) {

    var hrt;
    const responseArray = [];
    const success = jsonData.success;
    const timelines = success[0].timelines;
    for (const t of timelines) {
        hrt =  t.startTime
        responseArray.push(new PricePointResponse(hrt, t.priceData.finalPrice))
      }
    return responseArray;
}

