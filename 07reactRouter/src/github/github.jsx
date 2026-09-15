import { useLoaderData } from 'react-router-dom'

function Github() {
     // const [followers, setFollowers] = React.useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/KD2609/followers')
    //     .then(res => res.json())
    //     .then(data => setFollowers(data));
    // }, [])
    const followers = useLoaderData()

    return (
        <div className="text-center m-4 bg-gray-400 text-white text-3xl">
            Github Followers : {followers.length}
        </div>
    )
}

export default Github

export const GithubInfoLoader = async () => {
    const res = await fetch(
        'https://api.github.com/users/KD2609/followers'
    )

    const data = await res.json()

    return data
}
