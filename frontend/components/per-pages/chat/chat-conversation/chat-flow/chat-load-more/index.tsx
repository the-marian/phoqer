import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { IMessagesList } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
        backgroundColor: theme.palette.gray[1],
        borderRadius: theme.radius,
        transition: theme.transitions[0],

        ...theme.hover({
            backgroundColor: theme.palette.secondary[0],
        }),
        ...theme.focus({
            backgroundColor: theme.palette.secondary[0],
        }),
    },
}));

interface IProps {
    messages: IMessagesList;
}

const ChatLoadMore = ({ messages }: IProps): ReactElement | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();
    const chatId = +String(history.query.chat || '0');
    const [total, setTotal] = useState<number>(1);

    const handleClick = (): void => {
        setTotal(prev => prev + 1);
        dispatch({ type: types.LOAD_MORE_MESSAGES_START, payload: chatId, page: total + 1 });
    };

    return messages.data.total > total ? (
        <button className={css.btn} type="button" onClick={handleClick}>
            Load more
        </button>
    ) : null;
};

export default ChatLoadMore;
