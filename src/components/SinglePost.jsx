import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import parse from 'html-react-parser';
import {Button} from './index.js';



function SinglePost() {

    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.userData);
    const { id: postId } = useParams();
    const [isAuthor, setIsAuthor] = useState(false);
    const [post, setpost] = useState("");

    // never use the api call directoly inside the component function because everytime when the component renders it it call the api again
    // appwriteService.getSinglePost(postId)
    //     .then(res => {
    //         console.log(res)
    //         setpost(res)
    //     })
    //     .catch(error => {
    //         console.log("error occured when trying to fetch the post! - ", error);
    //     })

    // this only run on first render of component
    useEffect(() => {
        appwriteService.getSinglePost(postId)
            .then(res => {
                console.log(res)
                setpost(res)
            })
            .catch(error => {
                console.log("error occured when trying to fetch the post! - ", error);
            })
    }, [])

    useEffect(() => {
        const authorId = post?.userId;

        // if current user and the author of this post is same then give editiong option for the post
        if (authorId === currentUser?.$id) {
            setIsAuthor(true);
            console.log("current user and author is same so give them access for editing the post");
        } else {
            setIsAuthor(false);
            console.log("author and current user are not the same, so dont show them a editing btn")
        }
    }, [post])


    if (post) {
        return (
            <div className="w-full h-fit">
                {isAuthor ? <Button
                    className='w-20 absolute right-5 top-24'
                    children="Edit"
                    type='button'
                    textColor='text-white'
                    onClick={() => {
                        navigate(`/edit-post/${post.$id}`)
                    }}
                /> : null}
                <main className="w-full mt-24 h-fit pt-4 pb-20 px-3 mb-16 sm:w-3/4 sm:mx-auto md:w-3/5 lg:w-1/2 overflow-x-hidden">
                    <div className="mt-6 break-words px-4 text-center font-heading text-3xl font-extrabold text-slate-900 md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl mb-8 md:mb-14">
                        <h1 id="heading" className="text-3xl my-6 font-bold">{post?.title}</h1>
                    </div>
                    <div
                        id="author-div"
                        className="flex items-center gap-2 w-full justify-center"
                    >

                        <img
                            id="author-profile-photo"
                            className="size-9 rounded-full"
                            src={post.coverImageUrl}
                            alt=""
                        />
                        <span id="author" className="text-[20px]" > User Name </span>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <span id="post-date">{post?.createdAt}</span>
                    </div>
                    <div className="w-full h-fit rounded-md overflow-hidden my-5 border border-black shadow-custom-shadow-1 flex justify-center">

                        <img id="post-cover-image" src={post?.coverImageUrl} alt="" />
                    </div>
                    <div id="description" className="">
                        {parse(post?.content)}
                    </div>
                </main>

            </div>
        )
    } else {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1 className="text-3xl">Post does not exist</h1>
            </div>
        )
    }
}

export default SinglePost