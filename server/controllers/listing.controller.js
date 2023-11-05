
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';


 export const createListing= async(req,res,next)=>{

    try{
        const listing = await Listing.create(req.body);

       return res.status(201).json(listing);

    }
    catch(error){
        next(error);
    }

 };

 export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };

  export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };


  export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const searchTerm = req.query.searchTerm || '';
      const type = req.query.type || 'all'; // Default to 'all' if type is not specified
  
      let filter = {};
      
      // Apply filters based on query parameters
      if (type === 'discountPrice') {
        filter = { discountPrice: { $exists: true, $ne: null } };
      } else if (type === 'regularPrice') {
        filter = { discountPrice: null, regularPrice: { $exists: true, $ne: null } };
      } else if (type === 'color') {
        filter = { color: { $exists: true, $ne: null } };
      }
  
      // Apply search term filter
      if (searchTerm) {
        filter = {
          ...filter,
          $or: [
            { productName: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
          ],
        };
      }
  
      // Query the database using filters
      const listings = await Listing.find(filter)
        .sort({ createdAt: 'desc' }) // Sort by createdAt field in descending order
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  