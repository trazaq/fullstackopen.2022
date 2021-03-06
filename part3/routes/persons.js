var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET persons listing. */
router.get('/', function (req, res, next) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500).end();
        }
        res.json(data).end();
    });
});

router.post('/', function (req, res, next) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500).end();
        }
        let initial = JSON.parse(data);
        initial.persons.push(req.body);
        fs.writeFile('./db.json', JSON.stringify(initial), (err) => {
            if (err) {
                console.log(err);
                throw err
            }
            //console.log('update saved!')
            res.json(req.body).end();
        })
    });
});

router.delete('/:id', function (req, res, next) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500).end();
        }
        let id = req.params.id
        let initial = JSON.parse(data);
        initial.persons = initial.persons.filter(p => p.id !== id)
        fs.writeFile('./db.json', JSON.stringify(initial), (err) => {
            if (err) {
                console.log(err);
                throw err
            }
            //console.log('update saved!')
            res.sendStatus(200).end();
        })
    });
});

module.exports = router;
