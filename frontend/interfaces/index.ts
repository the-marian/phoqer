import { Store, AnyAction } from 'redux';

export interface ICategories {
  name: string;
  img: string;
}

export interface IState {
  categories: ICategories[] | null;
}

export interface IStore extends Store<IState, AnyAction> {
  sagaTask?: any;
}
