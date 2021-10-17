export interface ICategories {
    icon_image: string;
    image: string;
    slug: string;
    sub_category?: ICategories[];
}
