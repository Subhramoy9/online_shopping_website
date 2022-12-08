const mongoose=require('mongoose');
const {Schema}=mongoose;

const ProductSchema= new Schema({
    name:{
        type:String,
        required:[true,"Please enter the name of the product"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter the description of the product"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the price of the product"]
    },
    ratings:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"Please enter the category of the product"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter the stock of the product"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                // required:true
            },
            name:{
                type:String,
                //  required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]

});

const Product=mongoose.model("Product",ProductSchema);
module.exports=Product;