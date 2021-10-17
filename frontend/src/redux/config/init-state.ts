import { IStateConfig } from '../../interfaces';

const configInit: IStateConfig = {
    drawer: false,
    chatDrawer: false,
    searchParams: {
        search: null,
        category: null,
        sub_category: null,
        period: null,
        status: null,
        ordering: null,
        max_price: null,
        min_price: null,
        top: null,
        no_deposit: null,
        is_deliverable: null,
    },
};

export default configInit;
