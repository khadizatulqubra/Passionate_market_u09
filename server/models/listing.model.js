import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
    
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            validate: {
                validator: function (value) {
                  // Regular expression to match valid hexadecimal color codes (e.g., #RRGGBB)
                  const colorRegex = /^#([0-9a-fA-F]{3}){1,2}$/;
                  return colorRegex.test(value);
                },
                message: 'Invalid color format. Please use a valid hexadecimal color code (e.g., #RRGGBB).',
              },
        },

      /*   type:{
            type:String,
            required:true,
        }, */


        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        pieces: {
            type: Number,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    }, { timestamps: true });

   

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
     