import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../common/button';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        width: '100%',
    },
    textarea: {
        ...template(theme).input,
        minHeight: theme.rem(15),
        color: theme.palette.black[0],
        background: theme.palette.gray[0],
    },
    label: {
        display: 'block',
        width: '100%',
        marginBottom: theme.rem(2),
    },
    text: {
        marginBottom: theme.rem(0.6),
        fontSize: theme.rem(1.6),
    },
    btn: {
        ...template(theme).btn,
        marginBottom: theme.rem(4),
    },
}));

const Bio = (): ReactElement => {
    const css = useStyles();

    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    return (
        <div className={css.wrp}>
            <label className={css.label}>
                <p className={css.text}>User bio</p>
                <TextareaAutosize
                    value={value}
                    onChange={handleChange}
                    className={css.textarea}
                    name="bio"
                    wrap="soft"
                    placeholder="Начните печатать"
                />
            </label>

            <Button className={css.btn}>Применить изменения</Button>
        </div>
    );
};

export default Bio;
