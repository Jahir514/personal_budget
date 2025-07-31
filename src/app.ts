import express from 'express'
import { databaseConnection } from './config/databaseConnection'
import { errorHandler } from './middlewares/errorHandler.middleware'
import routes from './routes'
import { AppError } from './utils/AppError'
import cors from 'cors'
const app = express()
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
)
//parsing data from body of request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//main application route
app.use('/api/v1', routes)

//not found route
app.use('*', (req, res, next) => {
  throw new AppError('Not found', 404)
})

//error handle middleware
app.use(errorHandler)

//database connection
databaseConnection()
app.listen(8080, () => console.log('app is running on port 8080'))

export default app
