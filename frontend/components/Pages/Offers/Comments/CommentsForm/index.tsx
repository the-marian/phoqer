import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';
import TextareaResize from '../../../../Common/TextareaResize';

const useStyles = createUseStyles((theme: Theme) => ({
    textarea: {
        width: '100%',
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        border: 'none',
        borderRadius: theme.radius,
    },
    file: {
        margin: theme.rem(1, 0),
        color: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[3],

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
            marginRight: theme.rem(1),
        },
    },
}));

const CommentsForm = (): ReactElement => {
    const css = useStyles();
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    return (
        <>
            <TextareaResize
                value={value}
                height={45}
                className={css.textarea}
                onChange={handleChange}
                name="comment"
                placeholder="Оставте ваш отзыв от товаре"
            />
            <button className={css.file} type="button">
                <FontAwesomeIcon icon={faPaperclip} />
                <span>Add attachment</span>
            </button>
        </>
    );
};

export default CommentsForm;
