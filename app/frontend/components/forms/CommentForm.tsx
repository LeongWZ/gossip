import * as React from "react";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

type CommentFormProps = {
    label: string;
    submitButtonLabel: string;
    autoFocus: boolean;
    defaultCommentBody: string;
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleFormCancel: () => void;
};

function CommentForm(props: CommentFormProps) {
    const { label, submitButtonLabel, autoFocus, defaultCommentBody, handleFormSubmit, handleFormCancel } = props;

    const [body, setBody] = React.useState<string>(defaultCommentBody);

    const [showActionButtons, setShowActionButtons] = React.useState<boolean>(autoFocus);

    const resetForm = () => {
        setBody("");
        setShowActionButtons(false);
    };

    return (
        <form
            onSubmit={(event) => {
                resetForm();
                handleFormSubmit(event);
            }}
        >
            <TextField
                name="body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                onFocus={(event) => {
                    setShowActionButtons(true);
                    event.currentTarget.setSelectionRange(
                        event.currentTarget.value.length,
                        event.currentTarget.value.length,
                    );
                }}
                autoFocus={autoFocus}
                fullWidth
                multiline
                label={label}
                margin="dense"
                inputProps={{ maxLength: 5000 }}
                variant="standard"
            />

            {showActionButtons && (
                <Stack direction="row" spacing={2} style={{ float: "right", margin: "10px 5px 10px 0px" }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            resetForm();
                            handleFormCancel();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="outlined" disabled={body.trim() === ""}>
                        {submitButtonLabel}
                    </Button>
                </Stack>
            )}
        </form>
    );
}

export default CommentForm;
