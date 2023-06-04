import React from "react";
import { useSelector } from "react-redux";

function Home() {
    const { user } = useSelector((state) => state.users);
    return(
        <>
            <div>Home</div>
            {user && <h1>{user.name}</h1>}
        </>
    )
}

export default Home;