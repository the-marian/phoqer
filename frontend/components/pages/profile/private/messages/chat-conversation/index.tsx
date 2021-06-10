import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import ChatFlow from './chat-flow';
import ChatForm from './chat-form';

const useStyles = createUseStyles({
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '99%',
        width: '100%',
    },
});

interface IProps {
    children?: ReactElement;
}

const Conversation = ({ children }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.flex}>
            <ChatFlow>{children}</ChatFlow>
            {children ? null : <ChatForm />}
        </div>
    );
};

export default Conversation;
