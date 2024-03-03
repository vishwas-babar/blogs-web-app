import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { PostForm } from '../components/index.js';

function EditPost() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const dbpost = appwriteService.getSinglePost(id)
            .then((res) => {
                setPost(dbpost);
            })
            .catch((error) => {
                console.log("error when getting the editable post: ", error)

            })
    }, [id, navigate])

    return (
        <div className=' h-screen w-full flex items-center justify-center'>
            {post ? (
                <>
                    <PostForm post={post} />
                </>
            ) : <h1>This post is not exist</h1>}
        </div>
    )
}

export default EditPost;