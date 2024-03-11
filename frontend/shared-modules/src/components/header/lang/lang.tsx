import { FC, useCallback } from 'react';

import { IconButton, Dropdown, Option, useIsOpen, Flex } from 'phoqer';

import { changeLocale } from 'src/utils/change-locale';

import css from './lang.module.scss';

interface Props {
    locale?: string;
    values: {
        locale: string;
        title: string;
    }[];
}

export const Lang: FC<Props> = ({ values, locale = 'en-US' }) => {
    const { isOpen, onOpen, onToggle } = useIsOpen();

    const handleChange = useCallback(
        (locale?: string) => {
            if (locale) {
                changeLocale.submit(locale);
            }
            onToggle();
        },
        [onToggle],
    );

    return (
        <Flex align="center" justify="center" className={css.root}>
            <IconButton label="Language" className={css.btn} onClick={onOpen}>
                <img className={css.img} src={`/lang/${locale}.svg`} alt={`Language: ${locale}`} />
            </IconButton>

            <Dropdown position="right" size="sm" className={css.dropdown} isOpen={isOpen} onClose={onToggle}>
                {values.map(item => (
                    <Option
                        size="sm"
                        key={item.locale}
                        isActive={locale === item.locale}
                        onClick={() => handleChange(item.locale)}
                    >
                        {item.title}
                    </Option>
                ))}
            </Dropdown>
        </Flex>
    );
};
