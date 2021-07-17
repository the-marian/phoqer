import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../utils/theming/theme';
import ChatFlow from './chat-flow';
import ChatForm from './chat-form';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '99%',
        width: '80vw',
        ...theme.media(1060).max({
            width: '100%',
        }),
    },
}));

interface IProps {
    children?: ReactElement;
    onSubmit?: (value: string, uploads: string[]) => void;
}

const Conversation = ({ children, onSubmit }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.flex}>
            <ChatFlow>{children}</ChatFlow>
            {children ? null : <ChatForm onSubmit={onSubmit} />}
        </div>
    );
};

export default Conversation;