import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import { IComment, IState } from '../../../../../interfaces';
import { modal } from '../../../../Common/Modal';
import MidModalWrp from '../../../../Common/Modal/MidModalWrp';

const MAX_LENGTH = 200;

const useStyles = createUseStyles((theme: Theme) => ({
    item: {
        margin: theme.rem(4, 0),
        fontSize: theme.rem(1.6),
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(2.2),
        fontWeight: theme.text.weight[3],
        marginBottom: theme.rem(2),
        lineHeight: 1,

        '& a': {
            color: theme.palette.black[0],

            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary[0],
            },
        },
    },
    link: {
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],

        '&:hover': {
            textDecoration: 'underline',
        },
    },
    date: {
        marginLeft: theme.rem(2),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.gray[3],
    },
    modal: {
        fontSize: theme.rem(1.6),

        '& br': {
            display: 'block',
            marginBottom: theme.rem(2),
        },
    },
}));

const CommentsList = (): ReactElement => {
    const css = useStyles();
    const comments = useSelector<IState, IComment[]>(state => state.comments);

    const handleModal = (item: IComment) => (): void => {
        modal.open(
            <MidModalWrp>
                <h3 className={css.author}>
                    <Link href={routes.profile.single(item.author)}>
                        <a>{item.author}</a>
                    </Link>
                    <p className={css.date}>Дата: {item.pub_date}</p>
                </h3>
                <p
                    className={css.modal}
                    dangerouslySetInnerHTML={{ __html: item.body.replace(/\n/, '<div style="margin-bottom: 2rem"></div>') }}
                />
            </MidModalWrp>,
        );
    };

    return comments?.length ? (
        <ul>
            {comments?.map(item => (
                <li className={css.item} key={item.id}>
                    <h3 className={css.author}>
                        <Link href={routes.profile.single(item.author)}>
                            <a>{item.author}</a>
                        </Link>
                        <p className={css.date}>Дата: {item.pub_date}</p>
                    </h3>
                    {item.body?.length > MAX_LENGTH ? (
                        <>
                            <p>{item.body.slice(0, MAX_LENGTH) + '...  '}</p>
                            <button className={css.link} type="button" onClick={handleModal(item)}>
                                read more
                            </button>
                        </>
                    ) : (
                        <p>{item.body}</p>
                    )}
                </li>
            ))}
        </ul>
    ) : (
        <p>У этого объявления пока нету отзывов. Вы можете быть первым, кто оставит комментарий</p>
    );
};

export default CommentsList;
