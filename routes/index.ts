import express, { Request, Response } from 'express'

const Router = express.Router()

Router.get('/', (_req: Request, res: Response): void => {
  res.send(`<h3>Root</h3>`)
})

export default Router