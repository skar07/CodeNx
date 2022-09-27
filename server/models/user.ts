import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";

interface IUser {
      name: string;
      email: string;
      password: string;
}

const userSchema = new Schema<IUser>(
      {
            name: {
                  type: String,
                  required: [true, 'Please enter a name']
            },
            email: {
                  type: String,
                  required: [true, 'Please enter an email'],
                  match: [
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        'Please provide a valid email',
                  ],
                  unique: true
            },
            password: {
                  type: String,
                  required: [true, 'Please enter a password '],
                  minlength: 6
            }
      }
)

userSchema.pre('save', async function () {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT= ():string  => {
      return jwt.sign(
            { userId: this._id, name: this.name },
            process.env.JWT_SECET as string,
            {
                  expiresIn: process.env.JWT_LIFETIME
            }
      )
}

userSchema.methods.comparePassword = async function (candidatePassword: string) {
      const isMatch = await bcrypt.compare(candidatePassword, this.password)
      return isMatch
}

export const User = model<IUser>('User', userSchema)