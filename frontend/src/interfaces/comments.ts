export interface IComment {
    id: number;
    body: string;
    offer_id: string;
    replies_id: number | null;
    images: string[];
    author_id: number;
    dislikes: number;
    dislike: boolean;
    last_name: string;
    first_name: string;
    profile_img: string | null;
    likes: number;
    like: boolean;
    pub_date: string;
    replies: IComment[];
}

export interface IStateComments {
    loading: boolean;
    data: IComment[];
}
