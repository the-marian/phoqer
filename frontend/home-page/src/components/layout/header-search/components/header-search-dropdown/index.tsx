import { FC } from 'react';

import { CategoriesTab } from '@app/components/layout/header-search/components/header-search-dropdown/categories-tab';
import { TabsEnum } from '@app/components/layout/header-search/type';

import { GeneralTab } from './general-tab';
import { OffersTab } from './offers-tab';

interface Props {
    activeTab: TabsEnum;
    query: string;
    onClose: () => void;
}
export const HeaderSearchDropdown: FC<Props> = ({ activeTab, query, onClose }) => {
    switch (activeTab) {
        case TabsEnum.General:
            return <GeneralTab query={query} onClose={onClose} />;

        case TabsEnum.Offers:
            return <OffersTab query={query} onClose={onClose} />;

        case TabsEnum.Categories:
            return <CategoriesTab query={query} onClose={onClose} />;

        default:
            return <></>;
    }
};
