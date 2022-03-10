const express = require('express');
const router = express.Router();
const db = require('../db');

// test middleware function
router.use((req, res, next) => {
    console.log(`call: ${req.method} ${req.originalUrl} | date: ${new Date()}`);
    next();
})

// get all city and country
router.get('/', (req, res) => {
    db.query('SELECT * FROM city JOIN country ON city.CountryCode = country.Code ORDER BY ID ASC', (error, data) => {
        if (error) {
            res.send({ successful: false, data: [], message: error });
        } else {
            res.send({ successful: true, data: data, message: 'selected all city' });
        }
    })
})

// get by ID city
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM city JOIN country ON city.CountryCode = country.Code WHERE city.ID = ${id} ORDER BY ID ASC`;
    db.query(sql, (error, data) => {
        if (error) {
            res.send({ successful: false, data: [], message: error });
        } else {
            res.send({ successful: true, data: data, message: `Selected City by ID: ${id}` });
        }
    })
})

// create a city
router.post('/', (req, res) => {
    const formdata = {
        Name: req.body.Name,
        CountryCode: req.body.CountryCode,
        District: req.body.District,
        Population: req.body.Population
    }
    // if the column is empty
    if (formdata.Name === '' || formdata.CountryCode === '' || formdata.District === '' || formdata.Population === '') {
        const colm = formdata.Name === '' ? 'Name' : formdata.CountryCode === '' ? 'CountryCode' : formdata.District === '' ? 'District' : 'Population'
        return res.send({ successful: false, data: [], message: `${colm} column can't be an empty string` });
    }

    const sql = 'INSERT INTO city SET ?';
    db.query(sql, formdata, (error, data) => {
        if (error) {
            res.send({ successful: false, data: [], message: error });
        } else {
            res.send({ successful: true, data: data, message: `Insert ${formdata.Name} successfully` });
        }
    })
})

// update a city
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const formdata = {
        Name: req.body.Name,
        CountryCode: req.body.CountryCode,
        District: req.body.District,
        Population: req.body.Population
    }
    // if the column is empty
    if (formdata.Name === '' || formdata.CountryCode === '' || formdata.District === '' || formdata.Population === '') {
        const colm = formdata.Name === '' ? 'Name' : formdata.CountryCode === '' ? 'CountryCode' : formdata.District === '' ? 'District' : 'Population'
        return res.send({ successful: false, data: [], message: `${colm} column can't be an empty string` });
    }

    const sql = 'UPDATE city SET ? WHERE ID = ?';
    db.query(sql, [formdata, id], (error, data) => {
        if (error) {
            res.send({ successful: false, data: [], message: error });
        } else {
            res.send({ successful: true, data: data, message: `Update ID: ${id} successfully` });
        }
    })
})

// delete a city
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = `DELETE FROM city WHERE ID = ${id}`;
    db.query(sql, (error, data) => {
        if (error) {
            res.send({ successful: false, data: [], message: error });
        } else {
            res.send({ successful: true, data: data, message: `Delete ID: ${id} successfully` });
        }
    })
})

module.exports = router;