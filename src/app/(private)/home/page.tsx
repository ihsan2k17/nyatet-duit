import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata ={
    title:"Dashboard | Nyatet-Duit"
}

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
