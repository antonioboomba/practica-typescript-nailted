import axios from 'axios';
import React from 'react';
const helpers = {};

helpers.formatData = (data) => {
    var dataInTxt = data.data;
    let userArray = [];
    var globalArray = [];
    var JsonArray = [];
    dataInTxt.split("\n").map((i, key) => {
       globalArray.push(i);
    });

for (let i = 0; i < globalArray.length; i++) {
    const el = globalArray[i];
    
    var auxJson = {};
    userArray = el.split(',')
    auxJson = {
        "id":userArray[0],
        "name":userArray[1],
        "surname":userArray[2],
        "address":userArray[3],
        "phone":userArray[4],
        "mail":userArray[5],
        "birthdate":userArray[6]
    }
    JsonArray.push(auxJson)
}
return JsonArray;

}


helpers.calculateId = (data)=>{
    var id = data.length+1;
    return id;
}


helpers.writeInTxt = (txt)=>{
    console.log(txt);

}






export default helpers;