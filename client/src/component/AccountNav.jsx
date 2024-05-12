import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AccountNav() {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2]
    if (subpage == undefined) {
        subpage = 'profile';
    }

    function linkClasses(type = null) {
        const isActive = (pathname == "/account" && type == 'profile')
        let classes = 'py-2 px-4'
        if (type == subpage) {
            classes += " bg-blue-200 rounded-lg"
        } else {
            classes += " bg-gray-200 rounded-lg"
        }
        return classes
    }

    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link to={'/account'} className={linkClasses('profile')}>My Account</Link>
            <Link to={'/account/bookings'} className={linkClasses('bookings')}>My Bookings</Link>
            <Link to={'/account/places'} className={linkClasses('places')}>My Accomodations</Link>
        </nav>
    )
}

export default AccountNav