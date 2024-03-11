import { FC, useState } from 'react';

import {
    ChevronRightIcon,
    Container,
    Flex,
    Grid3x3Icon,
    ICategories,
    ListIcon,
    SegmentedControlItem,
    SegmentedControlList,
    Heading,
} from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './categories.module.scss';
import { Grid } from './grid/grid';
import { List } from './list/list';

interface Props {
    categories: ICategories;
}
export const Categories: FC<Props> = ({ categories }) => {
    const { t } = useTranslation();

    const [isGrid, setIsGrid] = useState(true);
    const handleSetGrid = (): void => setIsGrid(true);
    const handleSetList = (): void => setIsGrid(false);

    return (
        <section className={css.root} id="categories">
            <Container size="md">
                <Flex align="center" justify="space-between" className={css.header}>
                    <Heading as="h2">{t('Categories')}</Heading>

                    <Flex align="center">
                        <SegmentedControlList className={css.segments}>
                            <SegmentedControlItem isActive={isGrid}>
                                <button type="button" onClick={handleSetGrid} title={t('Display grid')}>
                                    <ListIcon />
                                </button>
                            </SegmentedControlItem>
                            <SegmentedControlItem isActive={!isGrid}>
                                <button type="button" onClick={handleSetList} title={t('Display list')}>
                                    <Grid3x3Icon />
                                </button>
                            </SegmentedControlItem>
                        </SegmentedControlList>
                        <Link href={routes.categories.list} size="sm" variant="ghost" rightIcon={<ChevronRightIcon />}>
                            {t('View all')}
                        </Link>
                    </Flex>
                </Flex>
                {isGrid ? <Grid categories={categories} /> : <List categories={categories} />}
            </Container>
        </section>
    );
};
