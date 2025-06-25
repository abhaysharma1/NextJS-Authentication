import mongoose from "mongoose";

export async function connect() {

    let isConnected = false;

    try {

        if(isConnected){
            return
        }
        
        await mongoose.connect(process.env.MONGO_URL); 
        const connection = mongoose.connection;

        isConnected = true;

        connection.on('connected',()=>{
            console.log("MongoDb Connected Successfully")
        })

        connection.on('error',(err)=>{
            console.log("MongoDb Connection Error, Please make sure MongoDb is running" + err);
            process.exit()
        })
        
    } catch (error) {
        console.log("Something went Wrong");
        console.log(error);
    }
    
}