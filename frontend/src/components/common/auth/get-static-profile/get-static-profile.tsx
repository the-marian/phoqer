import React, { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import useAuth from '../../../../hooks/auth.hook';
import types from '../../../../redux/types';

interface IProps {
    children: ReactNode;
}

const GetStaticProfile = ({ children }: IProps): JSX.Element => {
    const { token } = useAuth();
    const { locale } = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token.access_token) {
            dispatch({ type: types.GET_USER_START });
        }
    }, [token.access_token, dispatch, locale]);

    return <>{children}</>;
};

export default GetStaticProfile;
