import { Worker, Job } from 'bullmq';
const accountSid ='AC';
const authToken = '';
const client = require('twilio')(accountSid, authToken);


const smsBulkSend = async(job:Job)=>{
    let i = 0;
    console.log(job.data.number, "is being processed",i++);
    try {
        const number = await job.data.number; 
        var message = await client.messages.create({
         body: 'This message if from sushant',
         from: '+15017122661',
         to: `+977${number}`
       });
       console.log(message.status);
      }
      catch(err) {
        console.log(err);
      }


}
export const myWorker = new Worker('bulk-sms-queue', smsBulkSend, {  limiter:{max:1,duration:2000},connection: {
    host: "127.0.0.1",
    port: 6379
  }});

  
