import React, { useEffect } from 'react';

import classNames from 'classnames';
import { Container, Switch, ChevronLeftIcon, Button, useOpen, MenuIcon } from 'phoqer';
import { Appear, useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { AcceptedOrdersProvider } from 'src/context/accepted-orders.context';
import { StartedOrdersProvider } from 'src/context/in-progress-orders.context';
import { NewOrdersContextProvider } from 'src/context/new-orders.context';
import { AcceptedOrders } from 'src/pages/home/accepted-orders/accepted-orders';
import { Banner } from 'src/pages/home/banner/banner';
import { Header } from 'src/pages/home/header/header';
import { InProgressOrders } from 'src/pages/home/in-progress-orders/in-progress-orders';
import { NewOrders } from 'src/pages/home/new-orders/new-orders';
import { NewOrdersBadge } from 'src/pages/home/new-orders-badge/new-orders-badge';

import css from './home.module.scss';
import { Navigation } from './navigation/navigation';
import { Stats } from './stats/stats';

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
        <NewOrdersContextProvider>
            <StartedOrdersProvider>
                <AcceptedOrdersProvider>
                    <div className={css.menu}>
                        <Button onlyIcon className={css.btn} onClick={aside.onOpen}>
                            <MenuIcon />
                            {t('Open menu')}
                        </Button>
                    </div>

                    {aside.open && <div className={css.backdrop} onClick={aside.onClose} />}

                    <Appear key="HomePage">
                        <Container className={css.root}>
                            <aside className={classNames(css.aside, aside.open && css.open)}>
                                <div className={css.header}>
                                    <Button onlyIcon className={css.btn} onClick={aside.onClose}>
                                        <ChevronLeftIcon />
                                        {t('CLose')}
                                    </Button>
                                </div>

                                <div className={css.sticky}>
                                    <div>
                                        <NewOrdersBadge />
                                        <Navigation />
                                    </div>

                                    <Switch
                                        checked={isReduceAnimations}
                                        onChange={toggleIsReduceAnimations}
                                        label={t('Reduce animations')}
                                    />
                                </div>
                            </aside>

                            <div className={css.content}>
                                <Header />

                                <div className={css.flex}>
                                    <Stats />
                                    <Banner />
                                </div>

                                <NewOrders />
                                <InProgressOrders />
                                <AcceptedOrders />
                            </div>
                        </Container>
                    </Appear>
                </AcceptedOrdersProvider>
            </StartedOrdersProvider>
        </NewOrdersContextProvider>
    );
};

export default HomePage;
