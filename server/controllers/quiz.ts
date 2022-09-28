import { Response } from 'express';
import {User} from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors'


const register = async (req:Request, res:Response) => {
      const user = await User.create({ ...req.body })
      const token = user.createJWT()
      res.status(StatusCodes.CREATED).json({ user:{name: user.name}, token})
}