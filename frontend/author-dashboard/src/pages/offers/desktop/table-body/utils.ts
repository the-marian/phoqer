import { TableCellSizeEnum } from 'phoqer';

export interface HeaderType {
    key: string;
    title: string;
}

export const headerOrder: HeaderType[] = [
    { key: 'status', title: 'Status' },
    { key: 'options', title: 'Options' },
    { key: 'images', title: 'Images' },
    { key: 'title', title: 'Title' },
    { key: 'category', title: 'Category' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'price', title: 'Price' },
    { key: 'sale_percentage', title: 'Sale percentage' },
    { key: 'sale_description', title: 'Sale description' },
    { key: 'description', title: 'Description' },
];

export const sizeMap: { [key: string]: TableCellSizeEnum } = {
    status: TableCellSizeEnum.Small,
    options: TableCellSizeEnum.Middle,
    images: TableCellSizeEnum.Small2Extra,
    title: TableCellSizeEnum.Large5Extra,
    description: TableCellSizeEnum.Large8Extra,
    sale_percentage: TableCellSizeEnum.MiddleExtra,
    sale_description: TableCellSizeEnum.Large4Extra,
    reviews: TableCellSizeEnum.Middle,
    price: TableCellSizeEnum.Middle,
    category: TableCellSizeEnum.Middle,
};
