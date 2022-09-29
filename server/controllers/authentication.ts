import { Request, Response } from 'express';
import { User } from '../models/User'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors'

/** Registration controller which handles token creation on registration */
export const register = async (req: Request, res: Response) => {
      const user = await User.create({ ...req.body })
      const token = user.createJWT()
      res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

/** Login controller which handles token creation on logging in */
export const login = async (req: Request, res: Response) => {
      const { email, password } = req.body;
      if (!email || !password) {
            throw new BadRequestError('Please enter a valid email and password')
      }
      const user = await User.findOne(email)
      if (!user) {
            throw new UnauthenticatedError('Invalid User or password')
      }
      const passwordCheck = await user.comparePassword(password)
      if (!passwordCheck) {
            throw new UnauthenticatedError('Invalid User password')
      }
      const token = user.createJWT()
      res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

