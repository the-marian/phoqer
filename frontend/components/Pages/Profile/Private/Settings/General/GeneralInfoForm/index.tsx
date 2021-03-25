import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import TextareaAutosize from 'react-textarea-autosize';

import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import useAuth from '../../../../../../../hooks/auth.hook';
import Gift from '../../../../../../Common/Gift';
import Button from '../../../../../../Layout/Button';
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
    textarea: {
        ...template(theme).input,
        minHeight: theme.rem(15),
        color: theme.palette.black[0],
        background: theme.palette.gray[1],
    },
    input: {
        ...template(theme).input,
        color: theme.palette.black[0],
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
    btn: {
        ...template(theme).btn,
        marginBottom: theme.rem(4),
    },
}));

interface IValue {
    first_name: string;
    last_name: string;
    location: string;
    bio: string;
}

const GeneralInfoForm = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();

    const init: IValue = {
        first_name: auth?.first_name || '',
        last_name: auth?.last_name || '',
        location: auth?.location || '',
        bio: auth?.bio || '',
    };

    const [error, setErorr] = useState<IValue>(init);
    const [value, setValue] = useState<IValue>(init);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>First name</p>
                    <Input
                        value={value.first_name}
                        errors={error.first_name}
                        onChange={handleChange}
                        type="text"
                        name="first_name"
                        autoComplete="given-name"
                        placeholder="first name"
                        className={css.input}
                        errorsPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>First name</p>
                    <Input
                        value={value.last_name}
                        errors={error.last_name}
                        onChange={handleChange}
                        type="text"
                        name="last_name"
                        autoComplete="family-name"
                        placeholder="first name"
                        className={css.input}
                        errorsPlaceholder
                    />
                </label>

                <label className={css.label}>
                    <p className={css.text}>Location</p>
                    <Input
                        value={value.location}
                        errors={error.location}
                        onChange={handleChange}
                        type="text"
                        name="location"
                        autoComplete="location"
                        placeholder="location"
                        className={css.input}
                        errorsPlaceholder
                    />
                </label>

                <Gift />
            </div>

            <div className={css.wrp}>
                <label className={css.label}>
                    <p className={css.text}>User bio</p>
                    <TextareaAutosize
                        value={value.bio}
                        onChange={handleChange}
                        className={css.textarea}
                        name="bio"
                        wrap="soft"
                        placeholder="Начните печатать"
                    />
                </label>

                <Button className={css.btn}>Применить изменения</Button>
            </div>
        </>
    );
};

export default GeneralInfoForm;
