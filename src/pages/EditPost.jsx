import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { PostForm } from '../components/index.js';
import { useSelector } from 'react-redux';


function EditPost() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.userData)
    const [authStatus, setauthStatus] = useState(true);


    useEffect(() => {
        if (post?.userId === currentUser.$id) {
            setauthStatus(true)
        }else{ 
            false;
         }
    }, [id])

    useEffect(() => {
        const dbpost = appwriteService.getSinglePost(id)
            .then((res) => {
                setPost(res);
                console.log("this is dbpost fetched for editing: ", res)
            })
            .catch((error) => {
                console.log("error when getting the editable post: ", error)

            })
    }, [id, navigate])


    if (authStatus) {
        return (
            <div className=' h-screen w-full mt-28 flex items-center justify-center'>
                {post ? (
                    <>
                        <PostForm post={post} />
                    </>
                ) : <h1>This post is not exist</h1>}
            </div>
        )
    }else{
        return (
            <div className=' h-screen w-full flex items-center justify-center'>
                <h1 className='text-3xl '>you are not authorized to do that</h1>
            </div>  
        )
    }
    
}

export default EditPost;