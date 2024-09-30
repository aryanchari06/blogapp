import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function Postcard({
    $id,
    title,
    featuredImage,
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
                <div className='flex justify-center mb-4'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='rounded-xl w-full h-48 object-cover' 
                    />
                </div>
                <h2 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-300'>{title}</h2>
            </div>
        </Link>
    );
}

export default Postcard;
