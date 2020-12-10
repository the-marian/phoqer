import React, { ReactElement } from 'react';

interface IProps {
    text: string;
}

const NotificationSuccess = ({ text }: IProps): ReactElement => {
    return <div className="success">{text}</div>;
};

export default NotificationSuccess;
