import { Request, Response } from 'express'
import bcrypt from "bcryptjs"
import User from '../models/User'

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const register_user = async (req: Request, res: Response, next: any) => {
  const { firstName, lastName, email, password } = req.body

  const user: User | null = await User.findOne({ email })

  if(user){
    return res.status(400).json({
      success: false,
      message: "There is a user with this email already"
    })
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password
  })

  bcrypt.genSalt(10, (_err: Error, salt: string) => {
    bcrypt.hash(newUser.password, salt, async (err: Error, hash: any) => {
      if (err) throw err

      newUser.password = hash

      try{
        await newUser.save()

        res.status(201).end()
      } catch(error) {
        next(error)
      }
    })
  })
}

export { register_user }