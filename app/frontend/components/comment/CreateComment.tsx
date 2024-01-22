import { User } from "../types";
import LogInSignUpDialog from "../dialogs/LogInSignUpDialog";
import CommentForm from "../forms/CommentForm";
import * as React from "react";
import { Button, Card, CardContent } from "@mui/material";

const API_ENDPOINT = "/api/v1/comments";

type CreateCommentProps = {
    user: User | undefined;
    authToken: string | undefined;
    post_id: number;
    refreshComments: () => void;
};

function CreateComment(props: CreateCommentProps) {
    const { user, authToken, post_id, refreshComments } = props;

    function handleCreateFormData(body: string): void {
        if (user === undefined) {
            return;
        }

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                comment: {
                    user_id: user.id,
                    post_id: post_id,
                    body: body,
                },
            }),
        })
            .then((res) => {
                refreshComments();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const [openLogInSignUpDialog, setOpenLogInSignUpDialog] = React.useState<boolean>(false);

    const handleClickAddComment = () => {
        setOpenLogInSignUpDialog(true);
    };

    return (
        <Card variant="outlined">
            <CardContent>
                {user === undefined ? (
                    <>
                        <Button onClick={handleClickAddComment}>Add comment</Button>
                        <LogInSignUpDialog
                            open={openLogInSignUpDialog}
                            handleCloseDialog={() => setOpenLogInSignUpDialog(false)}
                        />
                    </>
                ) : (
                    <CommentForm
                        label="Add a comment"
                        submitButtonLabel="Comment"
                        autoFocus={false}
                        defaultCommentBody=""
                        handleFormData={handleCreateFormData}
                        handleFormCancel={() => undefined}
                    />
                )}
            </CardContent>
        </Card>
    );
}

export default CreateComment;
