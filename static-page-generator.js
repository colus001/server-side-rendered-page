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

const generateSite = () => {
  try {
    fs.statSync('dist')
  } catch (e) {
    childProcess.execSync('mkdir -p dist')
  }

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

    const filename = location === '/' ? 'index' : location.replace('/', '')
    fs.writeFileSync(`dist/${filename}.html`, fullRendered, 'utf8')
  })
}

generateSite()
