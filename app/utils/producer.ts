import { Queue, Worker } from 'bullmq'
import { myWorker } from './worker';

// Create a new connection in every instance
const bulkSmsQueue = new Queue('bulk-sms-queue', { connection: {
  host: "127.0.0.1",
  port: 6379
}});

const PhoneNumberAdd = async (numbers:number[])=>{
    for(let i= 0;i<numbers.length;i++){
        await bulkSmsQueue.add("number",{number:numbers[i]},{attempts:3,backoff:{type:'exponential',delay:1000}})
    }

    if(!myWorker.isRunning()) myWorker.run();


}

export default PhoneNumberAdd;