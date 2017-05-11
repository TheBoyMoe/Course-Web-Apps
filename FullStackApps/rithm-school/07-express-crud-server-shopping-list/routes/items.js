/* Item routes */
'use strict';

const express = require('express');
const router = express.Router();

let items = [];
let id = 1;

/* item routes */

// GET /items/all - delete all items
router.get('/all', (req, res, next)=>{
    items = [];
    res.redirect('/items');
});

// GET /users - display all items
router.get('/', (req, res, next)=>{
    // render the index.pug template passing it the items array to be displayed
    res.render('index', {items: items});
});


// GET /items/new - display the form allowing item to be added
router.get('/new', (req, res, next)=>{
    // display the new.pug template
    res.render('new');
});


// GET /items/search - display a search form allowing users to search for items in the list
router.get('/search', (req, res, next)=>{
    res.render('search');
});


// GET /items/:id - display a shopping list item
router.get('/:id', (req, res, next)=>{
    // retrieve the item with the matching id, and display
    let item = items.find((item)=>{
        return item.id === Number(req.params.id);
    });
    if(item){
        res.render('show', {item: item});
    } else {
        let err = new Error('Not found');
        err.status = 404;
        next(err);
    }
});


// GET /items/:id/edit - display a form allowing list item to be changed
router.get('/:id/edit', (req, res, next)=>{
    let item = items.find((item)=>{
        return item.id === Number(req.params.id);
    });
    if(item){
        res.render('edit', {item: item});
    } else {
        let err = new Error('Not found');
        err.status = 404;
        next(err);
    }
});


// POST /items - save the submitted list item, via '/items/new', to the array
router.post('/', (req, res, next)=>{
    items.push({
        name: req.body.name,
        id: id
    });
    id++;
    res.redirect('/items');
});


// POST /items/:name - display the result of the search
router.post('/:name/search', (req, res, next)=>{
    let item = items.find((item)=>{
        return item.name === req.body.name;
    });
    if(item){
        res.render('show', {item: item});
    } else {
        let err = new Error('Not found');
        err.status = 404;
        next(err);
    }
});


// PATCH /items/:id - save the updated item to the array
router.patch('/:id', (req, res, next)=>{
    let item = items.find((item)=>{
        return item.id === Number(req.params.id);
    });
    if(item){
        item.name = req.body.name; // update the item in the list
        res.redirect('/items');
    } else {
        let err = new Error('Not found');
        err.status = 404;
        next(err);
    }
});

// POST /items/:id - delete item from the array - uses http DELETE
router.delete('/:id', (req, res, next)=>{
    let itemIndex = items.findIndex((item)=>{
        return item.id === Number(req.params.id);
    });
    if(itemIndex> -1) {
        items.splice(itemIndex, 1);
        res.redirect('/items');
    } else {
        let err = new Error('Not found');
        err.status = 404;
        next(err);
    }
});

module.exports = router;