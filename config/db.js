import { mongo } from "mongoose"
import mongoose from mongoose

const connectDB =  async () => { 
    try {
       await mongoose.connect("mongodb://localhost:27017/myappdb", )
        console.log(`MongoDB Connected`)
    }
    catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connectDB;   