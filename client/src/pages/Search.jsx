import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    offer: false,
    sort: 'createdAt_desc', // Default sorting order
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
      const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
       offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
         offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'disconuntPrice' ||
      e.target.id === 'regularPrice'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }


    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='border-b-2 p-7 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          {/* Search Term */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold whitespace-nowrap'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='w-full p-3 border rounded-lg'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* Type */}
          <div className='flex flex-wrap items-center gap-2'>
            <label className='font-semibold'>Type:</label>
            {/* 'all' Checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>All</span>
            </div>
            {/* 'discountPrice' Checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='discountPrice'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'discountPrice'}
              />
              <span>Discount Price</span>
            </div>
            {/* 'regularPrice' Checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='regularPrice'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'regularPrice'}
              />
              <span>Regular Price</span>
            </div>
            {/* 'color' Checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='color'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'color'}
              />
              <span>Color</span>
            </div>
          </div>
          {/* Offer Checkbox */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Offer:</label>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer}
            />
          </div>
          {/* Sort Order */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
              id='sort'
              className='p-3 border rounded-lg'
            >
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          {/* Submit Button */}
          <button className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      {/* Listing Results */}
      <div className='flex-1'>
        <h1 className='p-3 mt-5 text-3xl font-semibold border-b text-slate-700'>
          Listing results:
        </h1>
        <div className='flex flex-wrap gap-4 p-7'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='w-full text-xl text-center text-slate-700'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='w-full text-center text-green-700 hover:underline p-7'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
