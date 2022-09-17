import { Schema, model } from "mongoose";

interface IQuiz {
      question: string;
      answer: string;
      choices: {
            choice: string[]
      }
}

const quizSchema = new Schema<IQuiz>({
      question: { type: String, require: [true, 'Question must be provided'] },
      answer: { type: String, require: [true, 'Answer must be provided'] },
      choices: { type: Object, require: [true, 'Enter the choices for the question'] }
})

export const Quiz = model<IQuiz>('Quiz', quizSchema)