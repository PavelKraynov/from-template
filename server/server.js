import axios from 'axios'
import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'


import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const {readFile } = require('fs').promises

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))



server.get('/api/v1/goods', async(req, res) => {
  const data = await readFile(`${__dirname}/data/data.json`, {encoding: 'utf8'})
  .then(text => JSON.parse(text))
  .catch((err) => err)
  const filterGoods = data.filter((it, index) => index < 30)
  res.json(filterGoods)
})

server.get('/api/v1/goods/:type/:direction', async(req, res) => {
  const { type, direction } = req.params
const data = await readFile(`${__dirname}/data/data.json`, { encoding: 'utf8' })
  .then((text) => JSON.parse(text))
  .catch((err) => err)
  const sorted = data.sort((a, b) => {

    if (type === 'price' && direction === 'a-z') {
     return a.price - b.price
    }
    if (type === 'price' && direction === 'z-a') {
      return b.price - a.price
    }
    if (type === 'title' && direction === 'a-z') {
      return a.title.localeCompare(b.title)
    }
    if (type === 'title' && direction === 'z-a') {
      return b.title.localeCompare(a.title)
    }
      return a.price - b.price

    })
  const filterGoods = sorted.filter((it, index) => index < 30)
  res.json(filterGoods)

})

server.get('/api/v1/rates', async(req, res) => {
const rate = await axios('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD')
.then(({ data }) => data.rates)
res.json(rate)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
