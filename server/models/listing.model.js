import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({

    
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },

        address:{
            type:String,
            required:true,
        },
        
      
        regularPrice:{
            type:Number,
            required:true,
        },

        salePrice:{
            type:Number,
            required:true,
        },

        pieces:{
            type:Number,
            required:true,
        },

        

        imageUrls:{
            type:Array,
            required:true,
        },

        category:{
            type:String,
            required:true,
        },
        userRef:{
            type:String,
            required:true,
        },



        
    },
    {timestamps:true}
);

const Listing = mongoose.model('Listing',listingSchema);
export default Listing;