import { FC } from 'react';

import { TabList, TabItem } from 'phoqer';

import { TabsEnum, TabType } from '@app/components/layout/header-search/type';
import { useTranslation } from '@app/hook/translations.hook';

import css from './header-search-tabs.module.scss';

interface Props {
    tabs: TabType[];
    activeTab: TabsEnum;
    onSelectTab: (value: TabsEnum) => void;
}
export const HeaderSearchTabs: FC<Props> = ({ tabs, activeTab, onSelectTab }) => {
    const { t } = useTranslation();

    return (
        <TabList className={css.list}>
            {tabs.map(item => (
                <TabItem key={item.id} isActive={activeTab === item.id}>
                    <button onClick={() => onSelectTab(item.id)} type="button">
                        {t(item.title)}
                    </button>
                </TabItem>
            ))}
        </TabList>
    );
};
