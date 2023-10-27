import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='border-b-2 p-7 md:border-r-2 md:min-h-screen'>
            <form  className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
            <label className='font-semibold whitespace-nowrap'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='w-full p-3 border rounded-lg'
            
            />
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
              
              />
              <span> Sale</span>
            </div>


            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='discountPrice'
                className='w-5'
              
              />
              <span>DiscountPrice</span>
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='regularPrice'
                className='w-5'
              
              />
              <span>RegularPrice</span>
            </div>
            </div>

            <label className='font-semibold '>color: 
              <input
                type='color'
                id='all'
                className='w-8 h-5 ml-2'

              />
         
            </label>
           
            <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
          
              id='sort_order'
              className='p-3 border rounded-lg'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='p-3 text-white uppercase bg-pink-700 rounded-lg hover:opacity-95'>
            Search
          </button>
            

                
            </form>
        </div>
        <div className=''>
            <h1 className='p-3 mt-5 text-3xl font-semibold text-pink-900 border-b'>Search Results...</h1>
        </div>
    </div>
  )
}
