import React, { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useParams } from 'react-router-dom'
import AccountNav from '../../component/AccountNav';
import axios from 'axios';

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
      console.log(data);
    })
  }, [])

  return (
    <>
      <AccountNav />
      <div>
        <div className="text-center">
          <Link className='bg-blue-200 py-2 px-6 inline-flex gap-1' to={'/account/places/new'} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Place
          </Link>
        </div>
        <div className='mt-4'>
          {places.length > 0 && (
            <>
              All your places:
            </>
          )}
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/' + place._id} className='bg-gray-300 rounded-2xl p-2 rounded-2xl my-3 gap-4 flex cursor-pointer '>
              <div className='w-32 h-32 flex bg-gray-300 shrink-0'>
                {place.photos.length > 0 && (
                  <img src={'http://localhost:4000/uploads/' + place.photos[0]} className='w-full rounded-2xl object-cover' />
                )}
              </div>
              <div className='grow-0 shrink'>
                <p className='text-xl font-bold'>{place.title}</p>
                <p className='text-md mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>

  )
}

export default PlacesPage