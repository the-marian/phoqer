import React, { useEffect } from 'react';

import classNames from 'classnames';
import { Switch, Container, useOpen, Button, MenuIcon, ChevronLeftIcon } from 'phoqer';
import { Appear, useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { AcceptedOrders } from 'src/pages/home/accepted-orders/accepted-orders';
import { Header } from 'src/pages/home/header/header';
import { InProgressOrders } from 'src/pages/home/in-progress-orders/in-progress-orders';

import css from './home.module.scss';
import { Navigation } from './navigation/navigation';
import { UserInfo } from './user-info/user-info';

const HomePage = (): JSX.Element => {
    const { t } = useTranslation();
    const aside = useOpen(false);
    const { isReduceAnimations, toggleIsReduceAnimations } = useReduceAnimations();

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                aside.onClose();
            }
        };

        if (aside) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [aside]);

    return (
        <>
            <div className={css.menu}>
                <Button onlyIcon className={css.btn} onClick={aside.onOpen}>
                    <MenuIcon />
                    {t('Open menu')}
                </Button>
            </div>

            {aside.open && <div className={css.backdrop} onClick={aside.onClose} />}

            <Appear>
                <Container className={css.root}>
                    <aside className={classNames(css.aside, aside.open && css.open)}>
                        <div className={css.header}>
                            <Button onlyIcon className={css.btn} onClick={aside.onClose}>
                                <ChevronLeftIcon />
                                {t('CLose')}
                            </Button>
                        </div>

                        <div className={css.sticky}>
                            <Navigation />
                            <Switch
                                checked={isReduceAnimations}
                                onChange={toggleIsReduceAnimations}
                                label={t('Reduce animations')}
                            />
                        </div>
                    </aside>

                    <div className={css.content}>
                        <Header />
                        <UserInfo />
                        <InProgressOrders />
                        <AcceptedOrders />
                    </div>
                </Container>
            </Appear>
        </>
    );
};

export default HomePage;
