import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { serverRedirect } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../components/Layout/Container';
import Draft from '../../../components/Pages/NewOffer/Draft';
import StepFour from '../../../components/Pages/NewOffer/StepFour';
import StepOne from '../../../components/Pages/NewOffer/StepOne';
import Stepper from '../../../components/Pages/NewOffer/Stepper';
import StepThree from '../../../components/Pages/NewOffer/StepThree';
import StepTwo from '../../../components/Pages/NewOffer/StepTwo';
import Success from '../../../components/Pages/NewOffer/Success';
import PageLayout from '../../../components/Shared/PageLayout';
import useTrans from '../../../hooks/trans.hook';
import { INewOffer, IState, IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

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

const STEPS: { [key: string]: JSX.Element | JSX.Element[] } = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
    draft: <Draft />,
    success: <Success />,
};

const STEPS_TITLE = ['Основное', 'Описание', 'Фото'];

const NewOffer = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();

    const [page, setPage] = useState<number | string>(1);
    const value = useSelector<IState, INewOffer>(state => state.offers.new_offer);

    useEffect(() => {
        if (history.query.step) {
            const step = String(history.query.step);

            /*
             * @desc don't use single if statement as it can brake the navigation logic
             * */
            if (step === '2' && !value?.isDone?.one) {
                // *
                // return to first page if user dont fill any of required field at step one
                history.push(routes.new_offer(1));
            } else if (step === '3' && !value?.isDone?.two) {
                // *
                // return to first page if user dont fill any of required field at step two
                history.push(routes.new_offer(1));
            } else if (['4', 'success'].includes(step) && (!value?.isDone?.one || !value?.isDone?.two)) {
                // *
                // return to first page if user dont fill any of required field at step one and two
                history.push(routes.new_offer(1));
            } else {
                setPage(step);
            }
        }
    }, [history.query.step]);

    return (
        <>
            <AuthRedirect />
            <Meta title={T.create_new_offer} h1={T.share_with_others_and_earn} />
            <PageLayout>
                <Container>
                    <>
                        <h2 className={css.title}>{T.share_with_others_and_earn}</h2>

                        {page in [1, 2, 3] ? <Stepper titles={STEPS_TITLE} current={+page} /> : null}

                        {history.query.step !== undefined ? STEPS[page] || STEPS[1] : null}

                        {page in [1, 2] && (
                            <p className={css.text}>
                                <span className={css.red}>*</span> Обязательное поле
                            </p>
                        )}
                    </>
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
        ctx?.store?.dispatch({ type: types.GET_CATEGORIES_START });
        ctx?.store?.dispatch(END);
        await (ctx?.store as IStore)?.sagaTask?.toPromise();
    },
);

export default NewOffer;
