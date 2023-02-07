import express from 'express'
import { login_user, register_user } from '../controllers/Auth'
const Router = express.Router()

Router.post('/api/auth/login/user', login_user)

Router.post('/api/auth/register/user', register_user)

export default Router