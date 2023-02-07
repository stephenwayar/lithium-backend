import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

import "./database/config"
import "./models/User"

import indexRoute from './routes/index'
import authRoute from'./routes/auth'

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


app.use(indexRoute)
app.use(authRoute)

export default app