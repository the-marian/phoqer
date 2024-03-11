import { ChangeEvent, MouseEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useState, useRef, FC } from 'react';

import classNames from 'classnames';
import { Router, useRouter } from 'next/router';
import {
    Input,
    SearchIcon,
    Dropdown,
    ChevronRightIcon,
    IconButton,
    Button,
    CloseIcon,
    Loader,
    Scroll,
    useIsOpen,
    Flex,
} from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { HeaderSearchInit } from '@app/components/layout/header-search/components/header-search-init';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import { HeaderSearchDropdown } from './components/header-search-dropdown';
import { HeaderSearchTabs } from './components/header-search-tabs';
import css from './header-search.module.scss';
import { TabsEnum } from './type';
import { tabs } from './utild';

const ANIMATION_TIMEOUT = 300;

const HeaderSearch: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const ref = useRef<HTMLButtonElement>(null);

    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.General);

    const isFocused = useIsOpen(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleClose = useCallback((): void => {
        isFocused.onClose();
        setTimeout(() => {
            setQuery('');
        }, ANIMATION_TIMEOUT);
    }, []);

    const handleBackdropClose = (event: MouseEvent<HTMLInputElement>): void => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Escape') {
            (event.target as HTMLInputElement)?.blur();
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        ref.current?.focus();
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = (): void => setLoading(true);
        const complete = (): void => setLoading(false);

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', complete);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', complete);
        };
    }, []);

    const isOpen = Boolean(isFocused.isOpen || query);
    const isAuthorPage = router.pathname.includes('/author');

    return (
        <div className={css.root}>
            <form
                action="#"
                className={classNames(css.form, isOpen && css.isOpen, isAuthorPage && css.isAuthorPage)}
                onSubmit={handleSubmit}
            >
                <Input
                    isFilled
                    name="search"
                    autoComplete="off"
                    value={query}
                    onFocus={isFocused.onOpen}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={css.input}
                    leftIcon={<SearchIcon />}
                    placeholder={t('Search')}
                />

                {query && (
                    <IconButton className={css.clear} onClick={handleClose} label={t('Clear search')}>
                        <CloseIcon />
                    </IconButton>
                )}
            </form>

            <div className={classNames(css.backdrop, isOpen && css.isOpen)} onClick={handleBackdropClose} />

            <Dropdown position="left" isOpen={isOpen} className={css.dropdown}>
                {loading && <Loader absolute />}

                {query && <HeaderSearchTabs tabs={tabs} activeTab={activeTab} onSelectTab={setActiveTab} />}

                <div className={css.scroll}>
                    <Scroll className={css.inner}>
                        {query ? (
                            <HeaderSearchDropdown activeTab={activeTab} query={query} onClose={handleClose} />
                        ) : (
                            <HeaderSearchInit />
                        )}
                    </Scroll>
                </div>

                <Flex align="center" justify="space-between" className={css.footer}>
                    <Link
                        size="sm"
                        variant="text"
                        onClick={handleClose}
                        href={routes.search({ query })}
                        rightIcon={<ChevronRightIcon />}
                    >
                        {t('View more results')}
                    </Link>

                    <Button size="sm" variant="text" ref={ref} onClick={handleClose}>
                        {t('Close')}
                    </Button>
                </Flex>
            </Dropdown>
        </div>
    );
};

export default HeaderSearch;
