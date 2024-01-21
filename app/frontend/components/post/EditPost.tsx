import { Category, Post } from "../types";
import PostForm from "../forms/PostForm";
import * as React from "react";
import { CardContent } from "@mui/material";

const API_ENDPOINT = "/api/v1/posts";

type EditPostProps = {
    authToken: string | undefined;
    post: Post;
    categories: Category[];
    setShowPostEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowPostTitle: React.Dispatch<React.SetStateAction<string>>;
    setShowPostBody: React.Dispatch<React.SetStateAction<string>>;
    setShowPostCategoryId: React.Dispatch<React.SetStateAction<number>>;
};

function EditPost(props: EditPostProps) {
    const {
        authToken,
        post,
        categories,
        setShowPostEditMode,
        setShowPostTitle,
        setShowPostBody,
        setShowPostCategoryId,
    } = props;

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title = data.get("title") as string;
        const body = data.get("body") as string;
        const category_id = parseInt(data.get("category_id") as string);

        fetch(`${API_ENDPOINT}/${post.id}`, {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                post: {
                    id: post.id,
                    category_id: category_id,
                    title: title,
                    body: body,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                setShowPostEditMode(false);
                setShowPostTitle(title);
                setShowPostBody(body);
                setShowPostCategoryId(category_id);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleCancelEdit = () => {
        setShowPostEditMode(false);
    };

    return (
        <CardContent>
            <PostForm
                label="Edit post"
                submitButtonLabel="Save"
                categories={categories}
                defaultPostCategoryId={post.category_id}
                defaultPostTitle={post.title}
                defaultPostBody={post.body}
                handleFormSubmit={handleEditSubmit}
                handleFormCancel={handleCancelEdit}
            />
        </CardContent>
    );
}

export default EditPost;
