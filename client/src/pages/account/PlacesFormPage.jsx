import React, { useEffect, useState } from 'react'

import Perks from '../../component/Perks';
import axios from 'axios';
import PhotosUploader from '../../component/PhotosUploader';
import AccountNav from '../../component/AccountNav';
import { Navigate, useParams } from 'react-router';

function PlacesFormPage() {
  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [notes, setNotes] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice]= useState(1);
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    if(!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setNotes(data.notes);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  }, [id])

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData= {title, address, addedPhotos, description, perks, notes, checkIn, checkOut,maxGuests, price};

    if(id) {
      await axios.put('/places', {id, ...placeData});
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);      
    }
  }

  if(redirect) {
    return <Navigate to={'/account/places'}/>
  }

  return (
    <div className='container mx-auto'>
      <AccountNav/>
      <form onSubmit={savePlace}>
        <span className='text-xl mt-4'>Title</span>
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='ex. 2 Bedroom Apartment' />
        <span className='text-xl mt-4'>Address</span>
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='ex. 211 Mass Ave.' />
        <span className='text-xl mt-4'>Photos</span>
        <p>Minimum of 1</p>

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <span className='text-xl mt-4'>Description</span>
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-xl' />
        <span className='text-xl mt-4'>Perks</span>
        <Perks selected={perks} onChange={setPerks} />
        <span className='text-xl mt-4'>Notes</span>
        <textarea value={notes} onChange={ev => setNotes(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-xl' />
        <span className='text-xl mt-4'>Check In/Out Times</span>
        <div className="grid gap-2 grid-cols-4">
          <div className="">

            <p>Check-In</p>
            <input type='text' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder='16:00' />
          </div>
          <div className="">
            <p>Check-Out</p>
            <input type='text' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='10:00' />
          </div>
          <div className="">
            <p>Max Guests</p>
            <input type='number' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder='1' />
          </div>
          <div className="">
            <p>Price Per Night</p>
            <input type='number' value={price} onChange={ev => setPrice(ev.target.value)} placeholder='1' />
          </div>
        </div>
        <button className='p-2 w-full rounded-xl bg-blue-200'>Save</button>
        {id && (
          <button className='p-2 w-full rounded-xl bg-red-200'>Delete</button>
          ) 
        }
      </form>

    </div>
  )
}

export default PlacesFormPage