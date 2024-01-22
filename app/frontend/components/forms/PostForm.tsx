import { Category } from "../types";
import * as React from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type PostFormProps = {
    label: string;
    submitButtonLabel: string;
    categories: Category[];
    defaultPostCategoryId: number | undefined;
    defaultPostTitle: string;
    defaultPostBody: string;
    handleFormData: (title: string, body: string, category_id: number) => void;
    handleFormCancel: () => void;
};

function PostForm(props: PostFormProps) {
    const {
        label,
        submitButtonLabel,
        categories,
        defaultPostCategoryId,
        defaultPostTitle,
        defaultPostBody,
        handleFormData,
        handleFormCancel,
    } = props;

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title = data.get("title") as string;
        const body = data.get("body") as string;
        const category_id = parseInt(data.get("category_id") as string);

        handleFormData(title, body, category_id);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <Typography variant="h5">{label}</Typography>
            <div>
                <FormControl required sx={{ marginTop: 2, marginBottom: 1, minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select name="category_id" defaultValue={defaultPostCategoryId || ""} label="Category">
                        {categories.map((category) => (
                            <MenuItem value={category.id} key={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <TextField
                name="title"
                defaultValue={defaultPostTitle}
                required
                fullWidth
                label="Post title"
                margin="normal"
                inputProps={{ maxLength: 120 }}
            />
            <TextField
                name="body"
                defaultValue={defaultPostBody}
                required
                fullWidth
                multiline
                minRows={5}
                label="Message"
                margin="dense"
                inputProps={{ maxLength: 5000 }}
            />
            <Stack direction="row" spacing={2} sx={{ float: "right", margin: "10px 5px 10px 0px" }}>
                <Button variant="outlined" onClick={handleFormCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="outlined">
                    {submitButtonLabel}
                </Button>
            </Stack>
        </form>
    );
}

export default PostForm;
