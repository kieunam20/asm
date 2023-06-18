var express = require ('express');
const BoyModel = require('../models/BoyModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var boy_list = await BoyModel.find({})
   res.render('boy/index', { boys : boy_list })
})



router.get('/home', (req, res) => {
   BoyModel.find((err, data) => {
       if (!err) {
           res.render('boy/home', { boys: data })
       }
   })
})

router.get('/list', async (req, res) => {
   var boy_list = await BoyModel.find({})
   res.render('boy/list', { boys: boy_list })
})

router.get('/delete/:id', async(req, res) => {
   await BoyModel.findByIdAndDelete(req.params.id)
   .then(() => { console.log ('Delete boy toy succeed !')});
   res.redirect('/boy');
})

router.post('/detail', async (req, res) => {
   var id = req.body.id;
   var boy = await BoyModel.findById(id);
   res.render("boy/detail", { boy : boy })
})

router.get('/add', (req, res) => {
   res.render('boy/add');
})

router.post('/add', async (req, res) => {
   var boy = req.body;
   await BoyModel.create(boy)
   .then(() => { console.log ("Add new toy succeed !")});
   res.redirect('/boy');
})

router.get("/edit/:id", (req, res) => {
   BoyModel.findById(req.params.id, (err, data) => {
     if (!err) {
        res.render("boy/edit", { boy: data })
     }
   })
})

router.post("/edit/:id", (req, res) => {
    BoyModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (!err) {
        console.log("Edit Toy succeed !")
        res.redirect("/boy")
      }
    })
})


//search 
router.post('/search', async (req, res) => {
   var keyword = req.body.title;
   var boys = await BoyModel.find({ title: new RegExp(keyword, "i")})
   res.render('boy/list', { boys: boys })
})

//sort 
router.get('/sort/asc', async (req, res) => {
   var boys = await BoyModel.find().sort({ title: 1 })
   res.render('boy/list', { boys: boys })
})

router.get('/sort/desc', async (req, res) => {
   var boys = await BoyModel.find().sort({ title: -1 })
   res.render('boy/list', { boys: boys })
})

module.exports = router;