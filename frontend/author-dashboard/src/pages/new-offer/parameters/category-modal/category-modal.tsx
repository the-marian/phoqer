import React, { useEffect, useState } from 'react';

import { ICategories, SmallModal, SelectOption, ICategory } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { CategoryItem } from 'src/components/category-item/category-item';
import { CategorySkeleton } from 'src/components/category-item/category-skeleton/category-skeleton';
import { useNewOfferContext } from 'src/context/new-offer.context';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { categoriesService } from 'src/services/categories.service';

import css from './category-modal.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const CategoryModal = ({ open, onClose }: Props): JSX.Element => {
    const { t } = useTranslation();

    const errorToast = useErrorToast();
    const { data, setData } = useNewOfferContext();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<ICategories>([]);

    const handleChange = (category?: ICategory): void => {
        onClose();

        if (category) {
            setData({ category });
        }
    };

    useEffect(() => {
        if (!categories.length && open) {
            setLoading(true);

            categoriesService
                .getCategories()
                .then(setCategories)
                .catch(errorToast)
                .finally(() => setLoading(false));
        }
    }, [categories.length, errorToast, open, t]);

    return (
        <SmallModal title={t('Select category')} open={open} onClose={onClose} className={css.modal}>
            <ul className={css.list}>
                {loading || !categories.length ? (
                    <CategorySkeleton />
                ) : (
                    categories.map(item => (
                        <li key={item.slug}>
                            <SelectOption<ICategory>
                                value={item}
                                onClick={handleChange}
                                active={data?.category?.slug === item.slug}
                            >
                                <CategoryItem category={item} />
                            </SelectOption>
                        </li>
                    ))
                )}
            </ul>
        </SmallModal>
    );
};
