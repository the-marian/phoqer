import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../../../../hooks/trans.hook';
import { IPublicProfile, IRegion, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import Input from '../../../../../common/input';
import Region from '../../../../../common/region';
import Bio from '../bio';

const useStyles = createUseStyles((theme: Theme) => ({
    box: {
        width: '100%',
        padding: theme.rem(4, 4, 0),
        borderRadius: theme.radius,
        boxShadow: theme.palette.shadowBorder,
        ...theme.media(768).max({
            padding: theme.rem(2, 2, 0),
        }),
    },
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: theme.rem(3),

        ...theme.media(768).max({
            marginBottom: theme.rem(2),
        }),
    },
    label: {
        display: 'block',
        width: '48%',
        marginBottom: theme.rem(2),
        cursor: 'pointer',

        ...theme.media(960).max({
            width: '100%',
        }),
    },
    text: {
        marginBottom: theme.rem(0.6),
        fontSize: theme.rem(1.6),
    },
    region: {
        background: theme.palette.white,
    },
    calendar: {
        width: '100%',
        fontSize: theme.rem(1.8),
    },
    secondary: {
        marginLeft: theme.rem(1),
        fontSize: theme.rem(1.4),
        color: theme.palette.gray[3],
    },
}));

interface IValue {
    bio: string;
    first_name: string;
    last_name: string;
    birth_date: string;
}

const errorInit: IValue = {
    bio: '',
    first_name: '',
    last_name: '',
    birth_date: '',
};

const generateInitVal = (user: IPublicProfile): IValue => ({
    bio: user?.bio || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    birth_date: user?.birth_date || '',
});

const GeneralInfoForm = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const region = useSelector<IState, IRegion>(state => state.region);
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const init: IValue = {
        bio: 'loading...',
        first_name: 'loading...',
        last_name: 'loading...',
        birth_date: 'loading...',
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Partial<IValue>>(errorInit);
    const [value, setValue] = useState<IValue>(init);

    useEffect(() => {
        if (value.bio === 'loading...' && user) setValue(generateInitVal(user));
    }, [user, value.bio]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setError({});
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        setLoading(true);
        if (!value.first_name.length) return setError({ ...error, first_name: 'required_field' });
        if (!value.last_name.length) return setError({ ...error, last_name: 'required_field' });
        if (value.birth_date.length) {
            const date = new Date(value.birth_date);
            if (isNaN(date.getTime())) return setError({ ...error, birth_date: 'invalid_date' });
            if (date.getFullYear() < 1900 || date.getFullYear() < 1900) return setError({ ...error, birth_date: 'invalid_date' });
        }

        dispatch({
            type: types.UPDATE_USER_START,
            payload: { ...value, country: region?.selected?.country || null, city: region?.selected?.city || null },
            callback: () => setLoading(false),
        });
    };

    return (
        <form action="#" method="post" className={css.box} onSubmit={handleSubmit}>
            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>{trans('first_name')}</p>
                    <Input
                        icon={faUserCircle}
                        value={value.first_name}
                        errors={error.first_name}
                        onChange={handleChange}
                        type="text"
                        name="first_name"
                        autoComplete="given-name"
                        placeholder="first_name"
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{trans('last_name')}</p>
                    <Input
                        icon={faUserCircle}
                        value={value.last_name}
                        errors={error.last_name}
                        onChange={handleChange}
                        type="text"
                        name="last_name"
                        autoComplete="family-name"
                        placeholder="last_name"
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{trans('user_location')}</p>
                    <Region className={css.region} />
                </label>

                <label className={css.label}>
                    <p className={css.text}>
                        {trans('birth_date')}
                        <span className={css.secondary}>DD-MM-YYYY</span>
                    </p>
                    <Input
                        value={value.birth_date}
                        errors={error.birth_date}
                        onChange={handleChange}
                        type="date"
                        name="birth_date"
                        placeholder="YYYY-MM-DD"
                        errorsInPlaceholder
                        min="1990-01-01"
                        max="2020-12-31"
                    />
                </label>
            </div>
            <Bio value={value.bio} onChange={handleChange} loading={loading} />
        </form>
    );
};

export default GeneralInfoForm;
