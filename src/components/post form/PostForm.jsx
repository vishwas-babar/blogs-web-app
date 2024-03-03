import { useCallback, useEffect } from "react"
import React from 'react'
import { RTE, Button, Input, Select } from "../index.js"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import appwriteService from "../../appwrite/config.js"



function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, getValues, control, } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const userData = useSelector(state => state.user.userData);
    const navigate = useNavigate();

    const submit = async (data) => {

        // if post is already  exist then update it otherwise create new post
        if (post) {
            try {
                const file = await appwriteService.uploadFile(data.image[0])

                if (file) {
                    await appwriteService.deleteFile(post.coverImageId);
                }

                const updatedPost = await appwriteService.updatePost(
                    post.$id, {
                    ...data,
                    coverImageId: file ? file.$id : undefined,
                    coverImageUrl: file ? file.href : undefined
                }
                );

                if (updatedPost) navigate(`post/${post.$id}`)
            } catch (error) {
                console.log('error in updating post! :', error)
            }

        } else {
            try {
                const uploadedImage = await appwriteService.uploadFile(data.image[0]); // in upload file we not get the url of the image
                const file = await appwriteService.getFilePreview(uploadedImage?.$id); // in getpreview we not get the id of the image
                console.log("file uploaded: ", file)
                console.log("this is href link: ", file.href)
                if (file) {
                    const fileId = uploadedImage.$id;
                    data.coverImageId = fileId;
                    data.coverImageUrl = file.href;
                    const createdPost = await appwriteService.createPost({
                        userId: userData.$id,
                        ...data
                    });

                    if (createdPost) navigate(`/post/${createdPost.$id}`)
                }
            } catch (error) {
                console.log("error occured when creating the new post: ", error);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value.trim().toLowerCase().replace(/\s/g, '-');
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title') {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [slugTransform, watch, setValue])

    return (
        <div className="mt-20">
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" >
                <div className=" w-2/3 px-2">
                    <Input
                        label="Title:"
                        type="text"
                        name="title"
                        placeholder="title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug:"
                        type='text'
                        name="slug"
                        placeholder="slug"
                        className="mg-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                    />
                </div>
                <div className=" w-1/3 px-2"    >
                    <Input
                        label="cover Image:"
                        type="file"
                        name="coverimage"
                        placeholder="add cover image"
                        className="mb-4"
                        {...register("image", { required: !post })} // due to this user can not creae the post
                    />
                    {post && (
                        <div>
                            <img src={appwriteService.getFilePreview(post.coverImageId)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}

                    <Select
                        label="Status"
                        options={[{ value: "active", name: "active" }, { value: "inactive", name: "inactive" }]}
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                   

                    <Button
                        children={post ? "update" : "create"}
                        type="submit"
                        className=" w-full"
                    />


                </div>
                <RTE
                        control={control}
                        name={"content"}
                        label={"content"}
                        defaultValue="write your article here"
                        className="mb-4"
                    />
            </form>
        </div>
    )
}

export default PostForm