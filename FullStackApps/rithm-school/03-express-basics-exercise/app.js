"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

let items = ['apples', 'pears', 'oranges', 'lemons', 'blueberries'];

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// GET /
app.get('/', (req, res)=>{
    res.render('list', {items});
});

// GET /search - handle form search submissions
app.get('/search', (req, res)=>{
    res.send(req.query);
});

/* ADD ITEM */
// GET /new-item - display a form allowing users to submit new items
app.get('/new-item', (req, res)=>{
    res.render('new-item');
});


// POST /add-item - add new items to the shopping list
app.post('/add-item', (req, res)=>{
    // get the new item, add to list and display
    let item = req.body.newItem;
    items.push(item);
    res.redirect('/');
});


/* REMOVE ITEM */
// GET /remove-item
app.get('/remove-item', (req, res)=>{
    res.render('remove-item');
});


// POST /delete-item
app.post('/delete-item', (req, res)=>{
    // delete item from the list
    let item = req.body.removeItem;
    if(item && items.includes(item)){
        items = items.filter((value)=>{
            return value !== item;
        });
    }
    res.redirect('/');
});


/* REMOVE ALL */
// GET /remove-all
app.get('/remove-all', (req, res)=>{
    res.render('remove-all');
});

// POST /delete-all
app.post('/delete-all', (req, res)=>{
    items = [];
    res.redirect('/');
});


/* UPDATE ITEM */
// GET /update-item
app.get('/update-item', (req, res)=>{
    res.render('update-item');
});

// POST /updated-list
app.post('/updated-list', (req, res)=>{
    let oldItem = req.body.oldItem;
    let newItem = req.body.newItem;
    if(oldItem && items.includes(oldItem)){
        items.forEach((value, i, items)=>{
            if(value === oldItem)
                items[i] = newItem;
        })
    }
    res.redirect('/');
});


app.listen(port, ()=>{
    console.log(`Express is listening on port ${port}`);
});