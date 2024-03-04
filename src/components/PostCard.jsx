import React from 'react'
import appwriteService from '../appwrite/config.js'

function PostCard({ slug, id, title, coverImageUrl, onClick }) {
    return (
        <div onClick={onClick}  className="border-r border-b border-l border-t rounded-md border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className='w-full flex  aspect-video overflow-hidden mb-3'>
                <img
                    src={coverImageUrl}
                    className=" object-cover "
                />
            </div>
            <div className="p-4 pt-2">
                <div className="mb-8">

                    <a
                        href="#"
                        className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 inline-block"
                    >
                        {title}
                    </a>
                </div>
                <div className="flex items-center">
                    <a href="#">
                        <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={coverImageUrl}
                            alt="Avatar of Jonathan Reinink"
                        />
                    </a>
                    <div className="text-sm">
                        <a
                            href="#"
                            className="text-gray-900 font-semibold leading-none hover:text-indigo-600"
                        >
                            vishwas babar
                        </a>
                        <p className="text-gray-600">24 feb 2024</p>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default PostCard