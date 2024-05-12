import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { differenceInCalendarDays } from 'date-fns';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');

    const [redirect, setRedirect] = useState('');

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn),)
    }




    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/places/${id}`).then(response => {
                setPlace(response.data);
            })
        }
    }, [id]);

    if (!place) return;

    if (showAllPhotos) {
        return (
            <div className='absolute flex justify-center flex-col bg-white min-w-full min-h-screen'>
                <button className='fixed top-5 right-20 p-3 bg-red-400' onClick={() => { setShowAllPhotos(false) }}>Exit</button>
                <p className='text-3xl'>
                    All images of {place.title}
                </p>

                {place.photos?.length > 0 && place.photos?.map(photo => <div className='flex justify-center m-3'>
                    <img src={'http://localhost:4000/uploads/' + photo} alt="" />
                </div>)}
            </div>
        );
    }

    async function bookThisPlace() {
        const data = { owner: place.owner, placeTitle:place.title, checkIn, checkOut, name, phone, place: place._id, price: numberOfDays * place.price, };
        const response = await axios.post('/bookings', data);
        const bookingId = response.data._id;
        alert('Success! You will be redirected back to the main page');
        setRedirect(`/`)
    }

    if(redirect) {
        return <Navigate to={redirect}/>;
    }

    return (
        <div className='container mx-auto mt-4 bg-gray-100 px-8 py-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <h2 className='block font-semibold underline my-2'>{place.address}</h2>

            <div className="">
                <div className="gap-2 grid relative grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
                    <div className='p-2'>
                        {place.photos?.[0] && (
                            <div>
                                <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos?.[0]} />
                            </div>
                        )}
                    </div>
                    <div className="grid p-2 ">
                        {place.photos?.[1] && (<img className='aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos?.[1]} />)}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (<img className='aspect-square object-cover relative' src={'http://localhost:4000/uploads/' + place.photos?.[2]} />)}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-5 p-2 text-xl rounded-2xl bg-red-300 right-5 '> Show More</button>
                </div>
                <div className='my-4 '>
                    <p className='my-3 font-semibold text-2xl'>Description</p>
                    {place.description}
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                        <b>Check in time: </b>{place.checkIn}:00 <br />
                        <b>Check out time: </b> {place.checkOut}:00<br />
                        <p><span className='font-bold'>Max Guests:</span> {place.maxGuests}</p>
                        <p className='font-bold text-xl'>Perks include:
                        </p>
                        {place.perks.map(perk => <p className='capitalize'>- {perk}</p>)}
                    </div>
                    <div>
                        <p className='font-bold'>Notes: </p>
                        <p>{place.notes}</p>
                        <div className='bg-gray-300 rounded-2xl text-center'>
                            <p className='font-bold text-2xl mt-3'>Price: ${place.price} per night</p>
                            {checkIn && checkOut && (<p className='font-bold text-2xl '>Total Price: ${place.price * numberOfDays} </p>)}
                            <div className='flex flex-col justify-center'>
                                <div className='flex justify-center my-2'>
                                    <label> CheckIn:
                                        <input type='date' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} max={checkOut} />
                                    </label>
                                    <label> CheckOut:
                                        <input type='date' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} min={checkIn} />
                                    </label>
                                </div>
                                {numberOfDays > 0 && (
                                    <div className='flex flex-col justify-center mx-5'>
                                        <input type='text' value={name} onChange={ev => setName(ev.target.value)} placeholder='Full name' />
                                        {/* <input type='text' value={email} onChange={ev => setEmail(ev.target.value)} placeholder='Email' /> */}
                                        <input type='text' value={phone} onChange={ev => setPhone(ev.target.value)} placeholder='Phone' />
                                    </div>
                                )}
                                <button onClick={bookThisPlace} className='px-3 py-2 my-3 font-bold bg-red-200'>Book Now {checkIn && checkOut && (<>
                                    <span>({numberOfDays} days)</span>
                                </>)}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PlacePage