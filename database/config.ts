import { connect, set } from 'mongoose'

const URI: any = process.env.MONGODB_URI

async function connectDB() {
  set("strictQuery", false)

  try{
    console.log("Connecting to mongoDB...")
    connect(URI)
    console.log("Successfully connected to MongoDB!")
  }
  catch(error: any){
    console.log("Failed to connect to MongoDB: ", error.message)
  }
}

connectDB()