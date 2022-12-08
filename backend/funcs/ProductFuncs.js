const Product= require('../models/productModel');
const User=require('../models/userModels');
const apiFeatures=require('../utils/apiFeatures');
var jwt = require('jsonwebtoken');
// const { use } = require('../routes/ProductRoutes');
//Creating the products



exports.createProduct=async(req,res)=>{
    try{
    const product=await new Product(req.body)
    await product.save();
    res.status(200).send('Successfully saved')
    }catch{(err)=>{
        res.status(400).send(err);
    }}
}

//Search products
exports.getProducts=async(req,res)=>{
    try{
        const prod=new apiFeatures(Product.find(),req.query);
        prod.search();
        prod.pagination(3);
        const products=await prod.Product;

        res.status(200).json(
            {
                products,
                success:true
            }
        )

    }catch{(e)=>{
        res.status(400).json({e}); 
        console.log(e);
    }}
} 

//Get a product detail

exports.getProductDetails=async(req,res)=>{
    const prod=await Product.findById(req.params.id);

    if(!prod){
        res.status(400).send('product not found');
    }


    res.status(200).json({
        success:true,
        prod
    });
}

//update a product

exports.updateProduct=async(req,res)=>{
    const prod=await Product.findById(req.params.id);
    if(!prod){
        res.status(404).send('product not found');
    }
    await Product.findByIdAndUpdate(req.params.id,req.body,function(err,res){
        if(err){
            res.status(404).send(err);
    }else{
            res.status(200).send(res);
    }}
    )
}

//Deleting a product

exports.deleteProduct=async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        res.status(404).send("Product not found");
    }
    try{
        product.remove();
        res.status(200).json({
            success:true,
            message:'product removed'
        })
    }catch(e){
        
        res.status(404).send(e);
    }

}

// Creating a review

exports.createReview=async(req,res)=>{

    const {rating,comment,productId}=req.body;

    const _token=req.cookies.token;
    // console.log(_token);

    const verifiedUser = jwt.verify(_token, "mynameissubhramoybiswasandimaboy");
     
    const review={
        user:verifiedUser._id,
        name:verifiedUser.name,
        rating,
        comment
    }

    const product=await Product.findById(productId);

    let isReviewed=false;
    
    product.reviews.forEach((e)=>{
        if(e.user.toString()===verifiedUser._id.toString()){
            isReviewed=true;
        }
    })

    if(isReviewed){ 
        product.reviews.forEach((e)=>{
            if(e.user.toString()===verifiedUser._id.toString()){
                e.rating=rating;
                e.comment=comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numofReviews=product.reviews.length;
    }

    let avg=0;

    product.reviews.forEach((e)=>{
        avg=avg+e.rating;
    })
    product.ratings=avg/product.reviews.length;

    await product.save();
    res.json({
        success:true,
        product
    });
}

//Deleting a review

exports.deleteReview=async(req,res)=>{
    const product=Product.findById(req.query._productId);
    if(!product){
        res.status(400).send('No product found');
    }
        console.log(product._id.toString()); 
    const reviews=product.reviews.filter((e)=>{
        e._id.toString()!==req.query._id.toString();
    })
    let avg=0;
    reviews.forEach((e)=>{
        avg+=e.rating;
    })
        
    let ratings=0;
    ratings=avg/reviews.length;

    const numofReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            ratings,
            numofReviews,
            reviews
        })

        res.json({
            success:true,
            product
        })
}