import React, { useEffect, useState } from 'react'
import AccountNav from '../../component/AccountNav'
import axios from 'axios'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(({ data }) => {
            setBookings(data);
            console.log(data);
        })
    }, [])


    return (
        <div>
            <AccountNav />
            BookingsPage
            <div className=''>
                {bookings.length > 0 && bookings.map(book => (
                    <div className='bg-gray-200 w-full p-3 text-xl my-3 rounded-2xl flex justify-between'>
                        <div className='bg-red-400 text-center w-full rounded-2xl'>
                            <p>Check In: {format(new Date(book.checkIn), 'P')}</p>
                            <p>Check Out: {format(new Date(book.checkOut), 'P')}</p>
                        </div>
                        <div className='w-full px-3'>
                            <p>Guest: {book.name}</p>
                            <p>Phone: {book.phone}</p>
                        </div>
                        <div className='w-full flex flex-col items-center'>
                            <p>Total Price: ${book.price}</p>
                            <Link to={`/place/${book.place}`} className='font-bold underline'>Location: {book.placeTitle}</Link>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage