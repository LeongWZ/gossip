export type Post = {
    id: number;
    username: string;
    title: string;
    body: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    comments_count: number;
};

export type Comment = {
    id: number;
    username: string;
    body: string;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    username: string;
    bio: string;
    created_at: string;
    updated_at: string;
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    posts_count: number;
};
