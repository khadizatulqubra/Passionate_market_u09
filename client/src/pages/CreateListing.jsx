import React from 'react'

export default function CreateListing() {
  return (
   <main className='max-w-4xl p-3 mx-auto'> 
      <h1 className='text-3xl font-semibold text-center my-7'>Create a  List</h1>
   
        <form  className='flex flex-col gap-4 sm:flex-row'>
          
          <div className='flex flex-col flex-1 gap-4'>
            <input type="text"  placeholder=' Productname' className='p-3 border rounded-lg' id='name' maxLength='62' minLength='5' required/>
            <input type="text"  placeholder=' Description' className='p-3 border rounded-lg' id='description' maxLength='100' minLength='5' required/>
            <input type="text"  placeholder=' Address' className='p-3 border rounded-lg' id='address' maxLength='62' minLength='5' required/>

          

            <div className='flex flex-wrap gap-4'>
            <div className='flex gap-2'>
              <input type="checkbox" id='sale'  className='w-5'/>
              <span className='flex gap-2'>sell</span>
            </div>

            <div className='flex gap-2'>
            
            <input type="color" id="color" name="product color" value="#ff0088"/>
            <span>Color</span>
            
            </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='flex items-center gap-2'>
                <input type="number"  id='pieces' min='1' max='100' required className='p-3 border border-gray-300 rounded-lg'/>
                <p>Product quantity</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number"  id='regularPrice' min='1' max='100' required className='p-3 border border-gray-300 rounded-lg' />
              <div className='flex flex-col items-center'> 
              <p>Regular Price</p>
              <span className='text-xs '>($/month)</span>
              </div>
                
              </div>
               <div className='flex items-center gap-2'>
                <input type="number"  id='discountPrice' min='1' max='100' required className='p-3 border border-gray-300 rounded-lg'/>
               <div className='flex flex-col items-center'>
                <p>Discount Price</p>
                <span className='text-xs '>($/month)</span>
               </div>
              </div>
              
            </div>
         
          </div>

          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'> images:
            <span className='ml-2 font-normal text-pink-700'> The first image will be the cover image (max 6)</span>
            </p>

            <div className='flex gap-4'>
              <input className='w-full p-3 border border-gray-300 rounded' type="file"  id='images' accept= 'image/*' multiple/>
              <button className='p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80'> Upload</button>
              </div>
            
            
              <button className='p-3 text-white uppercase bg-pink-900 rounded-lg hover:opacity-90 disabled:opacity-60'> Create Listing </button>
            </div>
          

        </form>
   </main>
  )
}
