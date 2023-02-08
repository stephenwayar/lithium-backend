import { Request, Response } from 'express'
import bcrypt from "bcryptjs"
import User from '../models/User'
import jwt from 'jsonwebtoken'

interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const login_user = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const secret: any = process.env.SECRET

  const user: User | null = await User.findOne({ email })

  const passwordIsCorrect: boolean = user ? await bcrypt.compare(password, user.password) : false

  if(!(user && passwordIsCorrect)){
    return res.status(401).json({
      success: false,
      message: "Email or password is incorrect"
    })
  }

  const userForToken = {
    id: user.id,
    email: user.email
  }

  const token = jwt.sign(
    userForToken,
    secret,
    { expiresIn: '1d' }
  )

  res.status(200).send({
    token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: user.id
  })
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

export { login_user, register_user }