import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useTrans from '../../../../../../../hooks/trans.hook';
import Button from '../../../../../../common/button';
import Input from '../../../../../../common/input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
    input: {
        background: theme.palette.gray[0],
    },
    label: {
        display: 'block',
        width: '48%',
        marginBottom: theme.rem(2),

        ...theme.media(960).max({
            width: '100%',
        }),
    },
    text: {
        marginBottom: theme.rem(0.6),
        fontSize: theme.rem(1.6),
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
    const trans = useTrans();

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
                    <p className={css.text}>{trans('old_password')}</p>
                    <Input
                        value={value.old_password}
                        errors={error.old_password}
                        onChange={handleChange}
                        type="password"
                        name="old_password"
                        autoComplete="given-name"
                        placeholder={trans('old_password')}
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{trans('create_new_password')}</p>
                    <Input
                        value={value.new_password}
                        errors={error.new_password}
                        onChange={handleChange}
                        type="password"
                        name="new_password"
                        autoComplete="family-name"
                        placeholder={trans('new_password')}
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{trans('confirm_password')}</p>
                    <Input
                        value={value.confirm_password}
                        errors={error.confirm_password}
                        onChange={handleChange}
                        type="password"
                        name="confirm_password"
                        autoComplete="confirm_password"
                        placeholder={trans('confirm_password')}
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>
            </div>
            <Button className={css.btn}>{trans('change_password')}</Button>
        </>
    );
};

export default ResetPassword;
