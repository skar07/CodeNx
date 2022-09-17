import 'dotenv/config'

import { connectDB } from './db/connect'
import { Quiz } from './models/quiz'
import * as data from './quiz.json'

async function start() {
      try {
            await connectDB(process.env.MONGO_URI as string)
            await Quiz.deleteMany()
            await Quiz.create(data)
            console.log('Quiz created')
            process.exit(0)
      }
      catch (err) {
            console.log(err)
      }
}

start()