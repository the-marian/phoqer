import { ReactNode } from 'react';
import { AnyAction, Store } from 'redux';

export interface ICategories {
  name: string;
  image: string;
  sub_categories?: { name: string }[];
}

export interface IModal {
  dom: ReactNode | null;
  size: 's' | 'm' | 'l';
  modal: boolean;
}

export interface IDropList {
  name: string;
  sub?: { name: string }[];
}

export interface IProduct {
  id: string | number;
  title: string;
  text: string;
  image: string;
  categories?: string[];
  type: ('top' | 'recent' | 'none')[];
  view: string | number;
  date: string;
  favorite: boolean;
  price: number;
  currency: string;
  per: string;
}

export interface IState {
  categories: ICategories[] | null;
  modal: IModal;
}

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: { toPromise: () => void };
}
