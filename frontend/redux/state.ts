import { IState } from '../interfaces';

const initState: IState = {
  categories: null,
  offers: {
    popular: {
      data: null,
      loading: true,
    },
  },
  modal: {
    dom: null,
    size: 's',
    modal: false,
  },
};

export default initState;
