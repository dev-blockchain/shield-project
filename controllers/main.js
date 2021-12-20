var express = require('express');
var router = express.Router();
var path = require('path');
const got = require('got');

router.get('/', async function(req, res, next) {
    res.render('public/index', { layout: "empty", page_title: 'Welcome', page_description:"" });
});

router.route('/enter-details').get(async function(req, res, next) {
    res.render('public/enter_details', { layout: "empty", page_title: 'Enter Details', page_description:"" });
}).post(async function(req, res, next) {
    res.redirect(`/quiz?name=${req.body.name + " " + req.body.name_last}&gender=${req.body.gender}&age=${req.body.age}`);
});

router.route('/certificate').get(async function(req, res, next) {
    name = req.query.name; age = req.query.age; gender = req.query.gender; score = 0;
    if(req.query.text.includes('Decentralized derivatives trading protocol')){score++;}
    if(req.query.text.includes('Peckshield')){score++;}
    if(req.query.text.includes('Reserve liquidity pool')){score++;}
    if(req.query.text.includes('Instant KYC')){score++;}
    if(req.query.text.includes('Five')){score++;}
    random_num = Math.floor(1000 + Math.random() * 9000);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    };
    date = new Date(); date = formatDate(date);
    temp_score = score/5; pie_deg = temp_score * 180; temp_score = temp_score * 100;
    res.render('public/certificate', { layout: "empty", temp_score: temp_score, name: name, age: age, gender: gender, score: score, date: date, random_num: random_num, pie_deg: pie_deg, page_title: 'Certificate', page_description:"" });
});

router.route('/quiz').get(async function(req, res, next) {
    res.render('public/assessment', { layout: "empty", page_title: 'Choose your style', page_description:"" });
}).post(async function(req, res, next) {
    console.log(req.body);
    res.json(req.body)
});


router.get('/error', function(req, res, next) {
    res.render('public/error', { layout: "empty", page_title: 'Error'});
});

router.get('/robots.txt', (req,res,next)=>{
    res.sendFile(path.resolve('public/robots.txt') );
});

module.exports = router;
