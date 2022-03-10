// A simple script to manually test build output

const fs = require('fs')
const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 8000

if (!fs.existsSync(path.resolve(__dirname, '../dist/index.html'))) {
  fs.copyFileSync(path.resolve(__dirname, '../src/index.html'), path.resolve(__dirname, '../dist/index.html'))
}

app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(express.static(path.resolve(__dirname, '../dist')))