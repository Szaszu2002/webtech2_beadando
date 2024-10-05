const express = require('express');
const app = express();
const containerRoute = express.Router();
const ObjectId= require('mongodb').ObjectId;

// Container model
let Container = require('../models/Container');
let Product = require('../models/Product');

// Add Container
containerRoute.route('/createContainer').post((req, res, next) => {
  Container.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});


// Get All Container
containerRoute.route('/getallContainer').get((req, res) => {
  Container.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Container


containerRoute.route('/updateContainer/:id').put((req, res, next) => {
  Container.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

containerRoute.route('/getAllContainer/:id').get((req,res)=>{
  Container.find({'$query':{'user_id':req.params.id}, '$orderby':{'name':-1}},(error, data)=>{
    if(error){
      return next(error)
    } else{
      res.json(data)
      
    }
  })
})

containerRoute.route('/getContainer/:id').get((req,res)=>{
  Container.findOne({'_id':new ObjectId(req.params.id)},(error, data)=>{
    if(error){
      return next(error)
    } else{
      res.json(data)
      
    }
  })
})

containerRoute.route('/getSharedContainers/:id').get((req,res)=>{
  Container.find({"shared.userName":req.params.id},(error, data)=>{
    if(error){
      return next(error)
    } else{
      res.json(data)
      
    }
  })
})

// Update Container
containerRoute.route('/updateContainer/:id').put((req, res, next) => {
  Container.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Container
containerRoute.route('/deleteContainer/:id').delete((req, res, next) => {
  console.log(req.params.id);
  Product.deleteMany({"container_id": req.params.id}, (error,data) =>{
    if (error) {
      return next(error);
    } 
  });
  Container.deleteOne({"_id": new ObjectId(req.params.id)}, (error, data) => {
    
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = containerRoute;
