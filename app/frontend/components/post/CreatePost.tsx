import { User, Category } from "../types";
import LogInSignUpDialog from "../dialogs/LogInSignUpDialog";
import PostForm from "../forms/PostForm";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Container } from "@mui/material";

const API_ENDPOINT = "/api/v1/posts";

type CreatePostProps = {
    user: User | undefined;
    authToken: string | undefined;
    categories: Category[];
};

function CreatePost(props: CreatePostProps) {
    const { user, authToken, categories } = props;

    const navigate = useNavigate();

    function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (user === undefined) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const title = data.get("title") as string;
        const body = data.get("body") as string;
        const category_id = parseInt(data.get("category_id") as string);

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                post: {
                    user_id: user.id,
                    category_id: category_id,
                    title: title,
                    body: body,
                },
            }),
        })
            .then((res) => {
                if (res.status !== 201) {
                    throw res;
                }
                return res.json();
            })
            .then((post) => {
                navigate(`/threads/${post.id}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Container fixed={true}>
            <LogInSignUpDialog open={user === undefined} handleCloseDialog={() => navigate("/")} />

            <Card variant="outlined">
                <CardContent>
                    <PostForm
                        label="Create post"
                        submitButtonLabel="Submit"
                        categories={categories}
                        defaultPostCategoryId={undefined}
                        defaultPostTitle=""
                        defaultPostBody=""
                        handleFormSubmit={handleCreateSubmit}
                        handleFormCancel={() => navigate("/")}
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreatePost;
