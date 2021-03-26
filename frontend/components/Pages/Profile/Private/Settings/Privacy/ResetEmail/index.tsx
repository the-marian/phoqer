import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../Layout/Button';
import Input from '../../../../../../Layout/Input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        minWidth: theme.rem(20),
    },
    input: {
        color: theme.palette.black[0],
        ...template(theme).input,
        background: theme.palette.gray[1],
    },
    label: {
        display: 'block',
        width: '100%',
        marginBottom: theme.rem(2),
    },
    text: {
        marginBottom: theme.rem(0.6),
        fontSize: theme.rem(1.4),
    },
    btn: template(theme).btn,
}));

const ResetEmail = (): ReactElement => {
    const css = useStyles();

    const [error, setErorr] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };
    return (
        <>
            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>New email</p>
                    <Input
                        value={value}
                        errors={error}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="email"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>
                <Button className={css.btn}>Изменить почту</Button>
            </div>
        </>
    );
};

export default ResetEmail;
