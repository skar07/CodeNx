import express, { Application, Request, Response } from "express";
require('dotenv').config();

const app: Application = express()
const connectDB = require('./db/connectDB')

//routes

app.get('/api', (req: Request, res: Response): void => {
    res.json({ message: "Hello, World!" })
});

const PORT: string | number = process.env.PORT || 3000;
async function start() {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, (): void => console.log(`Server listening on port: ${PORT}`))
    }
    catch (error) {
        console.log(error)
    }
}

start();