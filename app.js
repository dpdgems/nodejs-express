const express = require('express');
const app = express();
const multer  = require('multer');
const upload = multer();
const worldRouter = require('./routes/world');

// parsing application/json, application/x-www-form-urlencoded, multipart/form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single());

// router
app.use('/api/world', worldRouter);

// test homepage
app.get('/', (req, res) => {
    res.send('My first time using NodeJs and Express!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))