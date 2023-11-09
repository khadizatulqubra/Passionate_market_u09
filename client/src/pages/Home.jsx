import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [discountListings, setDiscountListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [regularListings, setRegularListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(discountListings);
  useEffect(() => {
    const fetchDiscountListings = async () => {
      try {
        const res = await fetch('/api/listing/get?disconutPrice=true&limit=4');
        const data = await res.json();
        setDiscountListings(data);
        fetchRegularListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRegularListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=regularPrice&limit=4');
        const data = await res.json();
        setRegularListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=discountPrice&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchDiscountListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28'>
        <h1 className='text-3xl font-bold text-pink-900 lg:text-6xl'>
          Find your favourite <span className='text-pink-500'>products</span>
          <br />
          at the best price
        </h1>
        <div className='text-xs text-red-400 sm:text-sm'>
          Whether you are looking to buy or sell products,
          <br />
          We have a wide range of products for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs font-bold text-red-900 sm:text-sm hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {discountListings &&
          discountListings.length > 0 &&
          discountListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]  mt-10'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10'>
        {discountListings && discountListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Top discounted Products </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?discountPrice=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {discountListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {regularListings && regularListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Regular price </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=regularPrice'}>Show more</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {regularListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'> Recent Discounted products</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=discountPrice'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}