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

    function handleEditFormData(title: string, body: string, category_id: number): void {
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

                // TODO: Replace with hook
                if (post !== null) {
                    post.title = title;
                    post.body = body;
                    post.category_id = category_id;
                }
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
                handleFormData={handleEditFormData}
                handleFormCancel={handleCancelEdit}
            />
        </CardContent>
    );
}

export default EditPost;
