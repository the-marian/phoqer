import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import ChatFlow from './ChatFlow';
import ChatForm from './ChatForm';

const useStyles = createUseStyles({
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
});

const Conversation = (): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.flex}>
            <ChatFlow />
            <ChatForm />
        </div>
    );
};

export default Conversation;
