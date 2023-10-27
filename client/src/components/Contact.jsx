import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeller();
  }, [listing.userRef]);
  return (
    <>
      {seller && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{seller.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.productName.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full p-3 border rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${seller.email}?subject=Regarding ${listing.productName}&body=${message}`}
          className='p-3 text-center text-white uppercase rounded-lg bg-slate-700 hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}