import React, { ReactElement } from 'react';

import LoginForm from '../../../common/auth/login-form';
import ControlButtons from '../control-buttons';

const NotAuthDrawer = (): ReactElement => {
    return (
        <>
            <ControlButtons />
            <LoginForm left />
        </>
    );
};

export default NotAuthDrawer;
