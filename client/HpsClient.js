import * as utils from ".././utils.js";
import * as requestt from '../model/request.js';

import {PricePointResponse} from '../model/response.js';


export async function callHPS(listingId) {
    var request = requestt.createHPSRequest(listingId);
    const response = await utils.getPostAPIResponse(request); // parent function has to be async for await to work
    return parseHPSjsonData(response)
}



async function parseHPSjsonData(jsonData) {
    var hrt;
    const responseArray = [];
    const success = jsonData.success;
    for (var pricePoint of success) {
        hrt = pricePoint.timePointPriceData.startTime;
        responseArray.push(new PricePointResponse(hrt, pricePoint.timePointPriceData.fp))
      }
    
      return responseArray;

}

