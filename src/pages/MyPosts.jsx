import React, { useEffect } from 'react';
import { useState } from 'react';
import appwriteService from '../appwrite/config.js';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../components/index.js';
import { useSelector } from 'react-redux';
import { Button } from '../components/index.js'


function MyPost() {

    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (userData) {
            const posts = appwriteService.getPostsByUser(userData?.$id)
            .then(res => setPosts(res.documents))
            .catch(error => console.log("error when fetching the my posts! :", error))
        }
    

    }, [])

    if (userData) {
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
                    className=' w-24 mt-4'
                />
            </div>
        )
    }
  
}

export default MyPost