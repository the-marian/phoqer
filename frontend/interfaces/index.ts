import { ReactNode } from 'react';
import { AnyAction, Store } from 'redux';

export interface ICategories {
  name: string;
  image: string;
  slug: string;
  sub_categories?: { name: string; slug: string }[];
}

export interface IModal {
  dom: ReactNode | null;
  size: 's' | 'm' | 'l';
  modal: boolean;
}

export interface IDropList {
  name: string;
  slug: string;
  sub?: { name: string; slug: string }[];
}

export interface IOfferCard {
  id: string;
  cover_image: string;
  currency: string;
  is_favorite: boolean;
  per: 'DAY' | 'MONTH' | 'YEAR' | 'HOUR';
  price: number;
  pud_date: string;
  title: string;
  views: number;
  description: string;
  type?: ('top' | 'recent' | 'none')[];
}

export interface IOffers {
  popular: IOfferCard[] | null;
}

export interface IState {
  modal: IModal;
  categories: ICategories[] | null;
  offers: IOffers;
}

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: { toPromise: () => void };
}
