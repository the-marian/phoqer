export interface HeaderType {
    key: string;
    title: string;
}

export const headerOrder: HeaderType[] = [
    { key: 'image', title: 'Image' },
    { key: 'options', title: 'Rent now' },
    { key: 'title', title: 'Title' },
    { key: 'price', title: 'Price' },
    { key: 'sale', title: 'Sale' },
    { key: 'category', title: 'Category' },
];

export const sizeMap: { [key: string]: number } = {
    image: 10,
    title: 45,
    price: 15,
    sale: 10,
    category: 12,
    options: 18,
};
