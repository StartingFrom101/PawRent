import React from 'react'
import { useParams } from 'react-router'

function BookingPage() {
    const {id} = useParams();
  return (
    <div>BookingPage {id}</div>
  )
}

export default BookingPage