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
    { key: 'price', title: 'Price' },
    { key: 'user', title: 'Author' },
    { key: 'address', title: 'Address' },
    { key: 'comment', title: 'Comment' },
    { key: 'date', title: 'Created' },
    { key: 'expired', title: 'Expiration Date' },
];

export const sizeMap: { [key: string]: TableCellSizeEnum } = {
    status: TableCellSizeEnum.Small,
    options: TableCellSizeEnum.Middle,
    title: TableCellSizeEnum.Large3Extra,
    images: TableCellSizeEnum.Small2Extra,
    price: TableCellSizeEnum.Middle,
    address: TableCellSizeEnum.Large4Extra,
    comment: TableCellSizeEnum.Large3Extra,
    user: TableCellSizeEnum.LargeExtra,
    date: TableCellSizeEnum.Large2Extra,
    expired: TableCellSizeEnum.Large2Extra,
};
