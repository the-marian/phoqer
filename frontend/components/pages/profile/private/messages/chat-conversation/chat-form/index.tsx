import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        flexGrow: 1,
        width: '100%',
        padding: theme.rem(1),
    },
    textarea: {
        ...template(theme).input,
        minHeight: theme.rem(6),
        maxHeight: '70vh',

        ...theme.media(768).max({
            padding: theme.rem(0.5, 1),
        }),
    },
    submit: {
        height: theme.rem(6),
        margin: theme.rem(0, 0, 0, 1),
        padding: theme.rem(0.5, 4),
        background: theme.palette.primary[0],
        color: theme.palette.white,
        borderRadius: theme.radius,
        fontSize: theme.rem(2),

        ...theme.media(768).max({
            padding: theme.rem(0.5, 2),
        }),
    },
}));

const ChatForm = (): ReactElement => {
    const css = useStyles();
    const [value, setValue] = useState<string>();
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };
    const handleKeyPress = async (event: KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (event.key === 'Enter' && !event.shiftKey) {
            console.log('send');
        }
    };

    return (
        <div className={css.flex}>
            <TextareaAutosize
                value={value}
                className={css.textarea}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                name="comment"
                wrap="soft"
                placeholder="Написать сообщение ..."
                title='Для переноса строки нажмите "Enter + Shift". Чтобы отправить сообщение нажмите "Enter"'
            />

            <Button className={css.submit} type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
        </div>
    );
};

export default ChatForm;
