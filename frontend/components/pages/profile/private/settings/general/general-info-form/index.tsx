import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../../../../assets/theme';
import useTrans from '../../../../../../../hooks/trans.hook';
import { IPublicProfile, IState } from '../../../../../../../interfaces';
import Input from '../../../../../../common/input';
import Region from '../../../../../../common/region';

const useStyles = createUseStyles((theme: Theme) => ({
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
}));

interface IValue {
    first_name: string;
    last_name: string;
}

const errorInit: IValue = {
    first_name: '',
    last_name: '',
};

const GeneralInfoForm = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    const init: IValue = {
        first_name: user?.first_name !== 'loading...' ? user?.first_name || '' : '',
        last_name: user?.last_name !== 'loading...' ? user?.last_name || '' : '',
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
                    <p className={css.text}>{trans('first_name')}</p>
                    <Input
                        icon={faUserCircle}
                        value={value.first_name}
                        errors={error.first_name}
                        onChange={handleChange}
                        type="text"
                        name="first_name"
                        autoComplete="given-name"
                        placeholder={trans('first_name')}
                        className={css.input}
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
                        placeholder={trans('last_name')}
                        className={css.input}
                        errorsInPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>{trans('user_location')}</p>
                    <Region className={css.input} />
                </label>
            </div>
        </>
    );
};

export default GeneralInfoForm;
