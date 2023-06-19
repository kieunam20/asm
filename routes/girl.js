var express = require ('express');
const GirlModel = require('../models/GirlModel');
var router = express.Router();

router.get('/', async (req, res) => {
   var girl_list = await GirlModel.find({})
   res.render('girl/index', { girls : girl_list })
})





router.get('/list', async (req, res) => {
   var girl_list = await GirlModel.find({})
   res.render('girl/list', { girls: girl_list })
})

router.get('/delete/:id', async(req, res) => {
   await GirlModel.findByIdAndDelete(req.params.id)
   .then(() => { console.log ('Delete girl toy succeed !')});
   res.redirect('/girl');
})

router.post('/detail', async (req, res) => {
   var id = req.body.id;
   var girl = await GirlModel.findById(id);
   res.render("girl/detail", { girl : girl })
})

router.get('/add', (req, res) => {
   res.render('girl/add');
})

router.post('/add', async (req, res) => {
   var girl = req.body;
   await GirlModel.create(girl)
   .then(() => { console.log ("Add new toy girl succeed !")});
   res.redirect('/girl');
})

router.get("/edit/:id", (req, res) => {
    GirlModel.findById(req.params.id, (err, data) => {
     if (!err) {
        res.render("girl/edit", { girl: data })
     }
   })
})

router.post("/edit/:id", (req, res) => {
    GirlModel.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (!err) {
        console.log("Edit Toy succeed !")
        res.redirect("/girl")
      }
    })
})


router.post('/search', async (req, res) => {
   var keyword = req.body.name;
   var girls = await GirlModel.find({ product: new RegExp(keyword, "i")})
   res.render('girl/list', { girls: girls })
})


module.exports = router;