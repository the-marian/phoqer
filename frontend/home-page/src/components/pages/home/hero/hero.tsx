import { FC, useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import NextImage from 'next/image';
import { Container, Text, Heading, SearchIcon, Flex } from 'phoqer';
import { CSSTransition } from 'react-transition-group';

import { Link } from '@app/components/common/link/link';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './hero.module.scss';
import party from './party.png';

const Confetti = dynamic(() => import('phoqer').then(module => module.Confetti), { ssr: false });

const CONFETTI_KEY = 'confetti-key';
const CONFETTI_TIME = 5_000;
const CONFETTI_TIMEOUT = 2_500;

export const Hero: FC = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isOpenedBefore = localStorage.getItem(CONFETTI_KEY);
        if (!isOpenedBefore) {
            setTimeout(() => {
                setOpen(true);
            }, CONFETTI_TIMEOUT); // for google page speed.
            localStorage.setItem(CONFETTI_KEY, 'opened before');
        }
    }, []);

    const runConfetti = useCallback((): void => {
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, CONFETTI_TIME);
    }, []);

    return (
        <Container size="md">
            {open && <Confetti />}

            <div className={css.container}>
                <CSSTransition in timeout={500} unmountOnExit appear>
                    <Flex justify="center" align="center" direction="column" className={css.hero}>
                        <button type="button" className={css.emoji} onClick={runConfetti} aria-label={t('Party')}>
                            <NextImage src={party} alt="" draggable="false" />
                        </button>

                        <Heading as="h1" size="lg" className={css.title}>
                            {t('# Share with others and earn')}
                        </Heading>
                        <Text size="sm" className={css.text}>
                            {t(
                                'Phoqer - Is an online advertising platform that brings people together to exchange goods and services',
                            )}
                        </Text>

                        <Link variant="primary" href={routes.search()} className={css.link} rightIcon={<SearchIcon />}>
                            {t('Search offers')}
                        </Link>
                    </Flex>
                </CSSTransition>
            </div>
        </Container>
    );
};
