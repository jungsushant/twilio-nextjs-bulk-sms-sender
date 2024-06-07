import { Worker, Job } from 'bullmq';
const accountSid ='';
const authToken = '';
const client = require('twilio')(accountSid, authToken);


const smsBulkSend = async(job:Job)=>{
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
export const myWorker = new Worker('bulk-sms-queue', smsBulkSend, {  connection: {
    host: "127.0.0.1",
    port: 6379
  }});

  
  myWorker.on('completed',()=>{
      console.log("All messages are sent");
      myWorker.disconnect();
})