const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/contact-manager";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("DB CONNECTED");
            return mongoose.connection;
        }

        if (mongoose.connection.readyState === 2) {
            await mongoose.connection.asPromise();
            console.log("DB CONNECTED");
            return mongoose.connection;
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
            bufferCommands: false,
        });

        console.log("DB CONNECTED");
        return mongoose.connection;
    } catch (err) {
        console.error("DB ERROR:", err.message);
        if (err.name === "MongooseServerSelectionError") {
            console.error(
                "MongoDB server is not running or unreachable. Start MongoDB locally or set MONGO_URI to a reachable instance."
            );
        }
        throw err;
    }
};

module.exports = connectDB;
