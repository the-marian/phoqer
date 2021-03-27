import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import Button from '../../../../../../Layout/Button';
import Input from '../../../../../../Layout/Input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        minWidth: theme.rem(20),
        width: '40%',
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
        fontSize: theme.rem(1.4),
    },
    btn: template(theme).btn,
}));

interface IPassword {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

const init: IPassword = {
    old_password: '',
    new_password: '',
    confirm_password: '',
};

const ResetPassword = (): ReactElement => {
    const css = useStyles();

    const [error, setError] = useState<IPassword>(init);
    const [value, setValue] = useState<IPassword>(init);
    console.log(setError);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>Old password</p>
                    <Input
                        value={value.old_password}
                        errors={error.old_password}
                        onChange={handleChange}
                        type="password"
                        name="old_password"
                        autoComplete="given-name"
                        placeholder="old password"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>New password</p>
                    <Input
                        value={value.new_password}
                        errors={error.new_password}
                        onChange={handleChange}
                        type="password"
                        name="new_password"
                        autoComplete="family-name"
                        placeholder="new password"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>Confirm password</p>
                    <Input
                        value={value.confirm_password}
                        errors={error.confirm_password}
                        onChange={handleChange}
                        type="password"
                        name="confirm_password"
                        autoComplete="confirm_password"
                        placeholder="confirm password"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>
                <Button className={css.btn}>Изменить пароль</Button>
            </div>
        </>
    );
};

export default ResetPassword;
