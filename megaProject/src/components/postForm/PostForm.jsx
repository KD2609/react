import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.$id || userData?.userData?.$id;

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active",
            });
        }
    }, [post, reset]);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]+/g, "-")
                .replace(/\s+/g, "-")
                .replace(/^-+|-+$/g, "")
                .slice(0, 36);
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && !post) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, post]);

    const submit = async (data) => {
        setError("");
        setLoading(true);

        try {
            if (post) {
                // Update existing post
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    featuredImage: file ? file.$id : post.featuredImage,
                    status: data.status,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id || post.$id}`);
                } else {
                    setError("Failed to update post. Please verify post details.");
                }
            } else {
                // Create new post
                if (!userId) {
                    setError("You must be logged in to create a post.");
                    setLoading(false);
                    return;
                }

                if (!data.image || !data.image[0]) {
                    setError("Featured image is required.");
                    setLoading(false);
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (!file) {
                    setError("Failed to upload featured image. Please check file format and size.");
                    setLoading(false);
                    return;
                }

                const fileId = file.$id;
                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredImage: fileId,
                    status: data.status,
                    userId: userId,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id || data.slug}`);
                } else {
                    // Clean up uploaded file if post creation failed
                    await appwriteService.deleteFile(fileId);
                    setError("Failed to create post. Slug may already exist or contain invalid characters.");
                }
            }
        } catch (err) {
            console.error("PostForm submission error:", err);
            setError(err.message || "An unexpected error occurred while saving the post.");
        } finally {
            setLoading(false);
        }
    };

    const onFormError = (validationErrors) => {
        console.warn("PostForm validation errors:", validationErrors);
        setError("Please fix the validation errors before submitting.");
    };

    return (
        <form onSubmit={handleSubmit(submit, onFormError)} className="flex flex-wrap">
            {error && (
                <div className="w-full px-2 mb-4">
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </p>
                </div>
            )}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-1"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                    <p className="text-red-600 text-sm mb-3">{errors.title.message}</p>
                )}

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-1"
                    disabled={!!post}
                    {...register("slug", {
                        required: "Slug is required",
                        maxLength: { value: 36, message: "Slug cannot exceed 36 characters" },
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && (
                    <p className="text-red-600 text-sm mb-3">{errors.slug.message}</p>
                )}

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    rules={{ required: "Content is required" }}
                />
                {errors.content && (
                    <p className="text-red-600 text-sm mt-1 mb-3">{errors.content.message}</p>
                )}
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: post ? false : "Featured image is required" })}
                />
                {errors.image && (
                    <p className="text-red-600 text-sm mb-3">{errors.image.message}</p>
                )}

                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && (
                    <p className="text-red-600 text-sm mb-3">{errors.status.message}</p>
                )}

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? (post ? "Updating..." : "Submitting...") : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}