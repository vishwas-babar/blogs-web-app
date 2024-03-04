import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, PostCard } from '../components/index.js';



function Home() {

    const [posts, setPosts] = useState([]);
    const loginStatus = useSelector(state => state.user.status);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getManyPost()
            .then((dbposts) => {
                if (dbposts) {
                    console.log(dbposts)
                    setPosts(dbposts.documents);
                    console.log(posts)
                }
            })
            .catch(error => {
                console.log(error)
                alert("unable to fetch posts");
            })
    }, [loginStatus, navigate])



    // return (
    //     <main className=' min-h-screen mt-28 flex gap-4 justify-around flex-wrap w-[90%] mx-auto mb-10 '>
    //         {posts.length > 0 ? posts.map(post => (
    //             <div key={post.$id} className=" w-80 h-fit"  >
    //                 <PostCard
    //                     id={post.$id}
    //                     title={post.title}
    //                     coverImageUrl={post.coverImageUrl}
    //                     onclick={() => {
    //                         navigate(`/post/${post.$id}`)
    //                     }}
    //                 />
    //             </div>

    //         )) : (<div className="w-full flex items-center justify-center"><h1 className=' text-lg' >we dont have any post yet</h1></div>)}
    //     </main>
    // )

    if (loginStatus) {
        return (
            <main className=' min-h-screen mt-28 flex gap-4 justify-around flex-wrap w-[90%] mx-auto mb-10 '>
                {posts.length > 0 ? posts.map(post => (
                    <div key={post.$id} className=" w-80 h-fit"  >
                        <PostCard
                            id={post.$id}
                            title={post.title}
                            coverImageUrl={post.coverImageUrl}
                            onClick={() => {
                                console.log("navigating user to - /post/", post.$id )
                                navigate(`/post/${post.$id}`)
                            }}
                        />
                    </div>

                )) : (<div className="w-full flex items-center justify-center"><h1 className=' text-lg' >we dont have any post yet</h1></div>)}
            </main>
        )
    } else {
        return (
            <div className=' h-screen w-full flex flex-col items-center justify-center'>
                <h1 className='mt-20'>You need to login posts</h1>
                <Button
                    children="Login"
                    onClick={() => navigate('/login')}
                    className="w-20 flex items-center justify-center"
                />
            </div>
        )
    }

}

export default Home