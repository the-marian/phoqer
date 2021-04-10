import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../common/button';
import Input from '../../../../../../common/input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        width: '40%',
        minWidth: theme.rem(20),
        marginLeft: theme.rem(4),
        ...theme.media(1100).max({
            width: '48%',
            marginLeft: '4%',
        }),
        ...theme.media(768).max({
            width: '100%',
            marginLeft: '0',
            marginTop: theme.rem(8),
        }),
    },
    input: {
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
    btn: template(theme).btn,
}));

const ResetEmail = (): ReactElement => {
    const css = useStyles();

    const [error, setError] = useState<string>('');
    const [value, setValue] = useState<string>('');
    console.log(setError);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    return (
        <div className={css.wrp}>
            <label className={css.label}>
                <p className={css.text}>New email</p>
                <Input
                    icon={faEnvelope}
                    value={value}
                    errors={error}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="email"
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>
            <Button className={css.btn}>Изменить почту</Button>
        </div>
    );
};

export default ResetEmail;
