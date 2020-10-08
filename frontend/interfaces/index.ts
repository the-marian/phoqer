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

export interface PopularOffer {
  id: string;
  cover_image: string;
  currency: string;
  is_favorite: boolean;
  per: 'DAY' | 'MONTH' | 'YEAR' | 'HOUR';
  price: number;
  date: string;
  title: string;
  view: number;
  description: string;
  type?: ('top' | 'recent' | 'none')[];
}

export interface IOffer {
  popular: PopularOffer[] | null;
}

export interface IState {
  modal: IModal;
  categories: ICategories[] | null;
  offers: IOffer;
}

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: { toPromise: () => void };
}
