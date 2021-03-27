import { faCompass } from '@fortawesome/free-regular-svg-icons/faCompass';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../../assets/theme';
import useAuth from '../../../../../../../hooks/auth.hook';
import Banner from '../../../../../../Common/Banner';
import Input from '../../../../../../Layout/Input';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        minWidth: theme.rem(20),
        width: '38%',

        '@media (max-width: 1200px)': {
            '&:nth-last-of-type(2)': {
                width: '70%',
            },
            '&:nth-last-of-type(1)': {
                marginTop: theme.rem(4),
                width: '100%',
            },
        },

        '@media (max-width: 680px)': {
            '&:nth-last-of-type(2)': {
                width: '100%',
            },
        },
    },
    banner: {
        height: 'calc(100% - 4.5rem)',
        padding: theme.rem(2),
        marginTop: theme.rem(2.6),
        background: theme.palette.soft[2],
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
}));

interface IValue {
    first_name: string;
    last_name: string;
    location: string;
}

const errorInit: IValue = {
    first_name: '',
    last_name: '',
    location: '',
};

const GeneralInfoForm = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();

    const init: IValue = {
        first_name: auth?.first_name || '',
        last_name: auth?.last_name || '',
        location: auth?.location || '',
    };

    const [error, setError] = useState<IValue>(errorInit);
    const [value, setValue] = useState<IValue>(init);
    console.log(setError);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>First name</p>
                    <Input
                        icon={faUser}
                        value={value.first_name}
                        errors={error.first_name}
                        onChange={handleChange}
                        type="text"
                        name="first_name"
                        autoComplete="given-name"
                        placeholder="first name"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>First name</p>
                    <Input
                        icon={faUser}
                        value={value.last_name}
                        errors={error.last_name}
                        onChange={handleChange}
                        type="text"
                        name="last_name"
                        autoComplete="family-name"
                        placeholder="first name"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>Location</p>
                    <Input
                        icon={faCompass}
                        value={value.location}
                        errors={error.location}
                        onChange={handleChange}
                        type="text"
                        name="location"
                        autoComplete="street-address"
                        placeholder="location"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>
            </div>
            <div className={css.wrp}>
                <Banner className={css.banner} />
            </div>
        </>
    );
};

export default GeneralInfoForm;
