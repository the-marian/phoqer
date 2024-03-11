import classNames from 'classnames';
import { SelectOption } from 'phoqer';

import css from './category-skeleton.module.scss';

export const CategorySkeleton = (): JSX.Element => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <li key={index}>
                    <SelectOption disabled>
                        <div className={css.category}>
                            <div className={classNames(css.skeleton, css.image)} />
                            <div className={css.content}>
                                <div className={classNames(css.skeleton, css.title)} />
                                <div className={classNames(css.skeleton, css.description)} />
                                <div className={classNames(css.skeleton, css.description)} />
                            </div>
                        </div>
                    </SelectOption>
                </li>
            ))}
        </>
    );
};
