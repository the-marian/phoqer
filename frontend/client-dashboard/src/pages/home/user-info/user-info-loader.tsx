import React from 'react';

import { Skeleton } from 'phoqer';

import css from './user-info.module.scss';

export const UserInfoLoader = (): JSX.Element => {
    return (
        <div className={css.root}>
            <Skeleton className={css.image} color="blue" />

            <div>
                <h3 className={css.title}>
                    <div>
                        <Skeleton style={{ width: '30rem' }} color="blue" />
                        <Skeleton style={{ width: '20rem', marginTop: '1rem' }} color="blue" />
                    </div>
                </h3>

                <table className={css.table}>
                    <tbody>
                        {[...Array(4)].map((_, index) => (
                            <tr key={index}>
                                <td>
                                    <Skeleton color="dark" style={{ width: '10rem' }} />
                                </td>
                                <td>
                                    <Skeleton style={{ width: '15rem' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
