import config from './config'

import { connectDB } from './db/connect'
import { Quiz } from './models/Quiz'
import * as data from './quiz.json'

async function start() {
      try {
            //connectDB
            await connectDB(config.MONGO_URI)
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