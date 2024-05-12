import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../../component/AccountNav";

export default function ProfilePage() {
    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = 'profile';
    }

    const [redirect, setRedirect] = useState(null);

    const { finalize, user, setUser } = useContext(UserContext);
    if (!finalize) {
        return <span className="text-3xl">Loading...</span>
    }



    if (finalize && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>

            <AccountNav/>
            Account Page for {user?.username};

            {subpage == 'profile' && (
                <div className="text-2xl text-center mx-auto ">
                    Logged in as {user.username} ({user.email}) <br />
                    <button onClick={logout} className="px-3 max-w-sm w-full py-1 my-2 bg-blue-200 rounded-lg">Log Out</button>
                </div>

            )}
            {subpage == 'places' && (
                <PlacesPage/>
            )}
        </div>
    );
}