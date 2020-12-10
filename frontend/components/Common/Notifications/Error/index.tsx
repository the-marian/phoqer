import React, { ReactElement } from 'react';

interface IProps {
    text: string;
}

const NotificationError = ({ text }: IProps): ReactElement => {
    return <div className="error">{text}</div>;
};

export default NotificationError;
