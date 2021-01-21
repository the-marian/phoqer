import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import serverRedirect from '../../../components/HOC/ServerRedirect';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/Main';
import StepOne from '../../../components/Pages/NewOffer/StepOne';
import Stepper from '../../../components/Pages/NewOffer/Stepper';
import StepThree from '../../../components/Pages/NewOffer/StepThree';
import StepTwo from '../../../components/Pages/NewOffer/StepTwo';
import Success from '../../../components/Pages/NewOffer/Success';
import { INewOffer, IState } from '../../../interfaces';
import { wrapper } from '../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        maxWidth: theme.rem(80),
        margin: '0 auto 5rem',
        textAlign: 'center',
        fontSize: theme.rem(3),
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        background: theme.palette.grad[2],
    },
    red: {
        color: theme.palette.red[0],
    },
    text: {
        maxWidth: theme.rem(80),
        margin: '3rem auto 5rem',
        color: theme.palette.gray[3],
        fontSize: theme.rem(1.3),
    },
}));

const STEPS = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <Success />,
};

const STEPS_TITLE = ['О товаре', 'Описание', 'Фото'];

const NewOffer = (): ReactElement => {
    const css = useStyles();
    const { query, push } = useRouter();

    const [index, setIndex] = useState<number>(1);
    const value = useSelector<IState, INewOffer>(state => state.offers.newOffer);

    useEffect(() => {
        if (query.step) {
            const step = typeof query.step === 'string' ? +query.step : +query.step[0];
            if (step === 2 && !value?.isDone?.one) {
                push(routes.new_offer(1));
            } else if (step === 3 && !value?.isDone?.two) {
                push(routes.new_offer(1));
            } else if (step === 4 && (!value?.isDone?.one || !value?.isDone?.two)) {
                push(routes.new_offer(1));
            } else {
                setIndex(step);
            }
        }
    }, [query.step]);

    return (
        <>
            <AuthRedirect />
            <Meta title="New product | Phoqer" />
            <Main>
                <Container>
                    <h1 className={css.title}>#Делитесь с другими и зарабатывайте</h1>

                    {index < 4 && <Stepper title={STEPS_TITLE} current={+index} />}

                    {query.step !== undefined && (STEPS[index] || STEPS[1])}

                    {index < 3 && (
                        <p className={css.text}>
                            <span className={css.red}>*</span> Обязательное поле
                        </p>
                    )}
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(serverRedirect());

export default NewOffer;
