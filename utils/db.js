import mongoose from "mongoose";

export const connect = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URI)

        if(database) {
            console.log("Database is connected");
        }
        else {
            console.log("Can't connect to database");
        }
    } catch (error) {
        console.log('This error is from /utils/db.js ', error);
    }
}