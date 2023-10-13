

import { config } from "../config/Configuration.js";

export class Request {
    constructor(url, headers, body = {}) {
      this.url = url;
      this.headers = headers;
      this.body = body;
    }
  
  }

export function createRTGRequest(listingId) {

    const apiUrl = config.RTGConfig.host + config.RTGConfig.uri+ listingId ;
    
    var myHeaders = getHeaders();
    myHeaders.append(config.Headers.clientId, config.RTGConfig.clientId);
    myHeaders.append(config.Headers.requestId, "123");

    const req = new Request(apiUrl, myHeaders)
    
    return req;
    
  }

  export function createHPSRequest(lid) {
    
    const apiUrl = config.HPSConfig.host + config.HPSConfig.uri;

    var myHeaders = getHeaders();
    
    myHeaders.append(config.Headers.clientId, config.HPSConfig.clientId);
    myHeaders.append(config.Headers.requestId, "123");
   
    const body = {
        listingId: lid,
        startTime: 1690977660000,
        endTime: 1696157245730,
        includeMetaData: true
      }

    const req = new Request(apiUrl, myHeaders, body)
  
    return req;
  }

  function getHeaders(){
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    return myHeaders;
  }
