import express from 'express'
import { register_user } from '../controllers/Auth'
const Router = express.Router()

Router.post('/api/auth/register/user', register_user)

export default Router