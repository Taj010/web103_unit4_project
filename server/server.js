import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

// import the router from your routes file
import dessertBoxRouter from './routes/dessertBoxRoutes.js'
import dessertOptionsRouter from './routes/dessertOptionsRoutes.js'
import dataRouter from './routes/dataRoutes.js'


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

// Enable CORS for all routes
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api/dessert-boxes', dessertBoxRouter)
app.use('/api/options', dessertOptionsRouter)
app.use('/api/data', dataRouter)


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})