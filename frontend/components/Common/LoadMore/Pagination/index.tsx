import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import ReactPaginate from 'react-paginate';

import { Theme } from '../../../../assets/theme';
import Button from '../../Button';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: theme.rem(4, 0),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    page: {
        '& > a': {
            display: 'block',
            minWidth: theme.rem(5),
            margin: theme.rem(0.4),
            padding: theme.rem(0.6, 1),
            borderRadius: theme.radius,
            background: theme.palette.gray[0],
            color: theme.palette.black[0],
            fontSize: theme.rem(1.6),
            textAlign: 'center',
            transition: theme.transitions[0],
            cursor: 'pointer',

            '&:hover': {
                background: theme.palette.gray[1],
            },
        },
    },
    active: {
        '& > a': {
            background: theme.palette.primary[0],
            color: theme.palette.trueWhite,
        },
    },
}));

interface IProps {
    loading: boolean;
    total: number;
    onClick: (page: number) => void;
    onMore: (page: number) => void;
}

const Pagination = ({ total, onClick, onMore, loading }: IProps): ReactElement | null => {
    const css = useStyles();
    const history = useRouter();
    const [page, setPage] = useState<number>(+history.query?.page || 1);

    const pushRouter = (value: number) => {
        setPage(value);
        window.history.pushState({}, '', history.route + '?' + queryString.stringify({ ...history.query, page: value }));
    };

    const handlePagination = ({ selected }: { selected: number }): void => {
        console.log({ selected });
        const value = selected + 1;
        pushRouter(value);
        onClick(value);
    };

    const handleMore = (): void => {
        const value = page < total ? page + 1 : total;
        pushRouter(value);
        onMore(value);
    };

    return total > 1 ? (
        <div className={css.root}>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                breakLabel="..."
                initialPage={page}
                pageCount={total}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePagination}
                containerClassName={css.pagination}
                breakClassName={css.page}
                pageClassName={css.page}
                activeClassName={css.active}
            />
            {page < total ? (
                <Button onClick={handleMore} loading={loading}>
                    Load more
                </Button>
            ) : null}
        </div>
    ) : null;
};

export default Pagination;
