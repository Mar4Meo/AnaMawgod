const fs = require('fs')

const express = require('express')

const app = express();

const dotenv = require('dotenv')

dotenv.config()

const Port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const cors = require('cors')

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.post('/api', (req, res, next) => {
    fs.writeFileSync('./codes.txt', JSON.stringify(req.body), 'utf-8')
    return res.status(200).json({
        Codes: req.body.nums
    })
})

app.get('/api2', (req, res, next) => {
    const cont = fs.readFileSync('./codes.txt', 'utf-8')
    return res.status(200).json({
        Cont: cont
    })
})

app.get('/test', (req, res, next) => {
    return res.status(200).json({
        Test: 'In Testing!'
    })
})

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        status: 'fail',
        msg: 'Page not found!'
    })
})

app.listen(Port, () => {
    console.log(`Run On: http://localhost:${Port}`)
})