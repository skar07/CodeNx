import express, { Application, Request, Response } from "express";
import 'dotenv/config'

const app: Application = express()
import { connectDB } from './db/connect'

//routes

app.get('/api', (req: Request, res: Response): void => {
    res.json({ message: "Hello, World!" })
});

const PORT: string | number = process.env.PORT || 3000;
async function start() {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI as string);
        app.listen(PORT, (): void => console.log(`Connected and listening on port: ${PORT}`))
    }
    catch (error) {
        console.log(error)
    }
}

start();