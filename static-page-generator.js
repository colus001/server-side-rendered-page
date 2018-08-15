import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import childProcess from 'child_process'

import App from './src/App'

const staticRoutes = [
  '/',
  '/about',
  '/contact',
]

const checkDirectorySync = (directory) => {
  try {
    fs.statSync(directory)
  } catch (e) {
    childProcess.execSync(`mkdir -p ${directory}`)
  }
}

const generateSite = () => {
  const template = fs.readFileSync('./public/index.html', 'utf8')

  staticRoutes.forEach((location) => {
    const rendered = ReactDOMServer.renderToString(
      <StaticRouter location={location} context={{}}>
        <App />
      </StaticRouter>
    )

    const fullRendered = template
      .replace(
        '<div id="root"></div>',
        `<div id="root">${rendered}</div>`
      )

    const path = `dist${location.replace('/', '')}/`
    checkDirectorySync(path)
    fs.writeFileSync(`${path}index.html`, fullRendered, 'utf8')
  })
}

generateSite()
