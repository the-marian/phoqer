import { ReactNode } from 'react';
import { AnyAction, Store } from 'redux';

export interface ICategories {
  name: string;
  img: string;
}

export interface IModal {
  dom: ReactNode | null;
  size: 's' | 'm' | 'l';
  modal: boolean;
}

export interface IState {
  categories: ICategories[] | null;
  modal: IModal;
}

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: { toPromise: () => void };
}
