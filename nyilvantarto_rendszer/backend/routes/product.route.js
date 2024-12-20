const express = require('express');
const app = express();
const productRoute = express.Router();
const ObjectId = require('mongodb').ObjectId;

// Product model
let Product = require('../models/Product');

// Add Product
productRoute.route('/addProduct').post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Products
productRoute.route('/getallProduct').get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Product
productRoute.route('/getProduct/:id').get((req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

productRoute.route('/getAllProduct/:id').get(async(req,res) => {
  
  let documents = await Product.find({'container_id':req.params.id}).sort({"name":1});
  res.json(documents);
})

// Update Product
productRoute.route('/updateProduct/:id').put((req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
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

// Delete Product
productRoute.route('/deleteProduct/:id').delete((req, res, next) => {
  Product.deleteOne({"_id": new ObjectId(req.params.id)}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

productRoute.route('/productLimits/:id').get(async (req, res, next)=>{
  let document = await Product.find({$query: {"container_id": req.params.id}}).sort({"limit": 1}).limit(1);
  try{
    let limit = document[0].limit;
    res.json(limit);
  } catch{
    res.json("");
  }
 
})

productRoute.route('/getAllProduct/:id/:searchValue').get((req,res) => {
  
  Product.find({'container_id':req.params.id, 'name':req.params.searchValue}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = productRoute;
