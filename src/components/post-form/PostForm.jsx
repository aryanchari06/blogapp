import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appwriteService from '../../appwrite/config';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = await data.image[0] ? service.uploadFile(data.image[0]) : null;

            if (file) {
                await service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(
                post.$id,
                {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                }
            );

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-white p-6 rounded-lg shadow-md">
            <div className="w-2/3 px-4 mb-4">
                <Input
                    label="Title :"
                    placeholder="Enter Title"
                    className="mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Enter Slug"
                    className="mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-4 mb-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 border border-gray-300 rounded-lg"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-40 object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : "bg-blue-500"} 
                    className="w-full hover:bg-opacity-80 transition duration-300"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
