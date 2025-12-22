import { headers } from 'next/headers';
import React from 'react'

const Home = async () => {
    const headersList =await headers();

    const name = headersList.get("x-name");
    const username = headersList.get("x-username");
    return (
        <div>
            ni home
            <h1>Im, {name}</h1>
            <h1>{username}</h1>
        </div>
    )
}

export default Home
