
const express = require('express');

const app = express()

app.get('/user', function (req, res) {
    console.log('-0', req, res);
    res.json({ user: 'lee' })
})

app.listen(3000)