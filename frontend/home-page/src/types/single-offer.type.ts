import { OfferItemType, OfferListType, ReviewItemType, Pagination } from 'phoqer';

export interface SingleOfferData {
    offer: OfferItemType;
    authorOffers: OfferListType;
    categoryOffers: OfferListType;
}

export type OfferPhotosType = Pick<ReviewItemType, 'id' | 'author' | 'images' | 'date'>;

export type OfferPhotosList = Pagination<OfferPhotosType[]>;

export interface OfferMeta {
    canDelete: boolean;
    canEdit: boolean;
    canRent: boolean;
    canChat: boolean;
    canAddToFavorite: boolean;
    isInFavorite: boolean;
}
