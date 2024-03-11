import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useFormikContext } from 'formik';
import {
    useOpen,
    Dropdown,
    SelectOption,
    ChevronDownIcon,
    Button,
    BreadcrumbWrp,
    Breadcrumb,
    EditIcon,
    Scroll,
    ICategories,
    ICategory,
    useMedia,
} from 'phoqer';
import { useTranslation } from 'react-i18next';

import { CategoryItem } from 'src/components/category-item/category-item';
import { CategorySkeleton } from 'src/components/category-item/category-skeleton/category-skeleton';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';
import { ErrorText } from 'src/pages/new-offer/shared/error-text';
import { categoriesService } from 'src/services/categories.service';

import css from './category.module.scss';

export const Category = (): JSX.Element => {
    const { t } = useTranslation();
    const formik = useFormikContext<EditOfferForm>();
    const { open, onToggle, onOpen, onClose } = useOpen();

    const isMobile = useMedia(650);
    const errorToast = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<ICategories>([]);

    const handleChange = (category?: ICategory): void => {
        onClose();

        if (category) {
            formik.setFieldValue('category', category);
        }
    };

    useEffect(() => {
        if (open) {
            categoriesService
                .getCategories()
                .then(setCategories)
                .catch(errorToast)
                .finally(() => setIsLoading(false));
        }
    }, [errorToast, open]);

    const dropdown = (
        <div className={css.dropdown}>
            <Button className={css.category} onClick={onOpen}>
                <EditIcon className={css.editIcon} />
                {formik.values.category?.title || t('Select category')}
                <ChevronDownIcon className={classNames(css.icon, open && css.open)} />
            </Button>

            <Dropdown open={open} onToggle={onToggle} position="left" className={css.inner}>
                <Scroll className={css.scroll}>
                    {isLoading ? (
                        <CategorySkeleton />
                    ) : (
                        categories.map(item => (
                            <SelectOption<ICategory>
                                key={item.slug}
                                value={item}
                                onClick={handleChange}
                                active={item.slug === formik.values.category?.slug}
                            >
                                <CategoryItem category={item} />
                            </SelectOption>
                        ))
                    )}
                </Scroll>
            </Dropdown>
        </div>
    );

    return (
        <>
            {isMobile ? (
                <div>
                    <p className={css.label}>{t('Category')}</p>
                    {dropdown}
                </div>
            ) : (
                <BreadcrumbWrp>
                    <Breadcrumb>
                        <p>{t('Home page')}</p>
                    </Breadcrumb>

                    <Breadcrumb>{dropdown}</Breadcrumb>

                    <Breadcrumb isLast>
                        <p>{formik.values.title}</p>
                    </Breadcrumb>
                </BreadcrumbWrp>
            )}

            <ErrorText error={formik.errors.category || ''} />
        </>
    );
};
