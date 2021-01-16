import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Meta from '../../../components/Common/Meta';
import Search from '../../../components/Common/Search';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/Main';
import { IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const SingleProductPage = (): ReactElement => (
    <>
        <Meta />
        <Main>
            <Container>
                <Search />
            </Container>
        </Main>
    </>
);

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default SingleProductPage;
