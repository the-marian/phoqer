import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useTrans from '../../../../../../../hooks/trans.hook';
import Button from '../../../../../../common/button';
import Input from '../../../../../../common/input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        marginTop: theme.rem(8),
        width: '100%',

        ...theme.media(768).max({
            marginTop: theme.rem(4),
        }),
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

const ResetEmail = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const [error, setError] = useState<string>('');
    const [value, setValue] = useState<string>('');
    console.log(setError);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    return (
        <div className={css.wrp}>
            <label className={css.label}>
                <p className={css.text}>{trans('change_email')}</p>
                <Input
                    icon={faEnvelope}
                    value={value}
                    errors={error}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder={trans('email')}
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>
            <Button className={css.btn}>{trans('change_email')}</Button>
        </div>
    );
};

export default ResetEmail;
