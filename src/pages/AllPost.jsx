import React, { useEffect } from 'react';
import { useState } from 'react';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../components/index.js';


function AllPost() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const dbposts = appwriteService.getManyPost();
        console.log(dbposts)

    }, [])

  return (
    <main className='mt-20 flex flex-wrap'>
        {posts.length-1 === 0 ? posts.map(post => (
            <div key={post.$id} className=" w-1/5 h-fit"  >
                <PostCard id={post.$id} title={post.title} coverImage={post.coverImageUrl} />
            </div>
                
        )) : (<h1 className=' mt-20' >we dont have any post yet</h1>)}
    </main>
  )
}

export default AllPost