import express, { Application, Request, Response } from "express";
import config from './config'

const app: Application = express()
import { connectDB } from './db/connect'

//routes

app.get('/api', (req: Request, res: Response): void => {
    res.json({ message: "Hello, World!" })
});

const PORT = config.PORT || 3000;
async function start(): Promise<void> {
    try {
        //connectDB
        await connectDB(config.MONGO_URI);
        app.listen(PORT, (): void => console.log(`Connected and listening on port: ${PORT}`))
    }
    catch (error) {
        console.log(error)
    }
}

start();