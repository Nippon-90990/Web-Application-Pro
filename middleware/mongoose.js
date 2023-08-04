import mongoose from "mongoose";

mongoose.set('strictQuery',true);  //    ||  this portion come frome another video.
// mongoose.set('strictQuery',true)      ||  for removing warning.

const connectDb = handler => async (req ,res)=> {
    if(mongoose.connections[0].readyState){
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return(req, res);
}

export default connectDb;
