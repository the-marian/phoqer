export interface IPublicProfile {
    bio?: string;
    birth_date?: string | null;
    communication_rate?: number;
    date_joined?: string;
    description_rate?: string;
    dislikes?: number;
    email?: string | null;
    id?: string | number;
    first_name?: string;
    last_login?: string;
    last_activity?: string;
    last_name?: string;
    likes?: number;
    city?: string;
    country?: string;
    profile_img?: string | null;
    response_rate?: number;
    satisfaction_rate?: number;
}

export interface IStateProfile {
    public: IPublicProfile | null;
    loading: boolean;
}
