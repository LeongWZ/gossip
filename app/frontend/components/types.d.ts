export type Post = {
    id: number;
    username: string;
    user_id: number;
    title: string;
    body: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    comments_count: number;
    replies_count: number;
};

export type Comment = {
    id: number;
    username: string;
    user_id: number;
    post_id: number;
    body: string;
    created_at: string;
    updated_at: string;
    replies_count: number;
};

export type Reply = {
    id: number;
    username: string;
    user_id: number;
    comment_id: number;
    post_id: number;
    body: string;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    username: string;
    created_at: string;
    updated_at: string;
    posts_count: number;
    comments_count: number;
    replies_count: number;
};

export type Category = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    posts_count: number;
};
