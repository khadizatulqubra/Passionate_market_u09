import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const ListingItem = ({ listing }) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || 'https://assets-global.website-files.com/619e8d2e8bd4838a9340a810/64c590c754d6bc13ebd90cbc_ai_product_photo_styles.webp'}
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='flex flex-col w-full gap-2 p-3'>
          <p className='text-lg font-semibold truncate text-slate-700'>
            {listing.productName}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='w-4 h-4 text-green-700' />
            <p className='w-full text-sm text-gray-600 truncate'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='mt-2 font-semibold text-slate-500 '>
            kr
            {listing.offer
              ? listing.discountPrice.toLocaleString('sek-SE')
              : listing.regularPrice.toLocaleString('sek-SE')}
          
          </p>
          <div className='flex gap-4 text-slate-700'>
          {listing.discountPrice && (
  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
    {listing.discountPrice} <span className='font-extralight'>kr </span> OFF
  </p>
)}


          
           
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
