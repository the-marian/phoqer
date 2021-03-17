import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
// import queryString from 'query-string';
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
        margin: theme.rem(8, 0, 4),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    page: {
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
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        pointerEvents: 'none',
    },
    nav: {
        display: 'block',
        minWidth: theme.rem(5),
        margin: theme.rem(0.4),
        padding: theme.rem(0.6, 1),
        borderRadius: theme.radius,
        background: theme.palette.white,
        color: theme.palette.black[0],
        fontSize: theme.rem(1.6),
        textAlign: 'center',
        transition: theme.transitions[0],
        cursor: 'pointer',

        '&:hover': {
            background: theme.palette.gray[1],
        },
    },
    disabled: {
        opacity: 0.1,
        pointerEvents: 'none',
    },
    more: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.rem(4, 0, 1),
        padding: theme.rem(1.2, 3),
        background: theme.palette.gray[2],
        color: theme.palette.trueWhite,
        fontSize: theme.rem(1.6),
        borderRadius: theme.radius,

        '& span': {
            marginLeft: theme.rem(1),
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

    const pushRouter = (page: number) => {
        setPage(page);
        history.push(
            {
                pathname: history.route,
                query: { ...history.query, page },
            },
            undefined,
            { scroll: false, shallow: true },
        );
    };

    const handlePagination = ({ selected }: { selected: number }): void => {
        pushRouter(selected + 1);
        onClick(selected + 1);
    };

    const handleMore = (): void => {
        pushRouter(page < total ? page + 1 : total);
        onMore(page < total ? page + 1 : total);
    };

    return total > 1 ? (
        <div className={css.root}>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                breakLabel="..."
                forcePage={page - 1}
                pageCount={total}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePagination}
                containerClassName={css.pagination}
                breakLinkClassName={css.page}
                pageLinkClassName={css.page}
                activeLinkClassName={css.active}
                previousLinkClassName={css.nav}
                nextLinkClassName={css.nav}
                disabledClassName={css.disabled}
            />
            {page < total ? (
                <Button className={css.more} onClick={handleMore} loading={loading}>
                    <FontAwesomeIcon icon={faRedo} />
                    <span>Load more</span>
                </Button>
            ) : null}
        </div>
    ) : null;
};

export default Pagination;
