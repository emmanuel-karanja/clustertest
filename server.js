const express=require('express');
const crypto = require('crypto');
const app=express();

let reqId=1;

app.get('/heavy',(req,res)=>{

    reqId++;
    //const reqid=crypto.randomUUID();
    console.log(`REQUEST::: ${reqId} running on Worker Process PId:: ${process.pid}} STARTED : at ${new Date()}`)
    let total=0;
    for(let i=0;i<50000000;i++){
        total++;
    }
    console.log(`REQUEST::${reqId} running on Worker Process PId:: ${process.pid}} ENDED : at ${new Date()}`)
    res.status(200).send(`Result of the CPU intensive task is ${total}`)
});



module.exports=app;