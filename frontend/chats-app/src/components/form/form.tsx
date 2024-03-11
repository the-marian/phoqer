import React, { ChangeEvent, useState } from 'react';

import { Textarea, ArrowUpIcon, Button, ImageIcon } from 'phoqer';
import { useTranslation } from 'react-i18next';

import css from './form.module.scss';

export const Form = (): JSX.Element => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setValue(event.target.value);
    };

    return (
        <form action="#" className={css.form}>
            <Textarea
                minRows={1}
                value={value}
                onChange={handleChange}
                className={css.input}
                placeholder={t('Type your message ...')}
            />

            <Button onlyIcon className={css.btn}>
                <ImageIcon />
            </Button>

            <Button primary onlyIcon type="submit" className={css.submit}>
                <ArrowUpIcon />
            </Button>
        </form>
    );
};
