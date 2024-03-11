import React from 'react';

import { StatusBadge } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';

import { useStatusText } from 'src/hook/status-text.hook';

interface Props {
    status: string;
    type?: 'text' | 'icon';
}
export const Status = ({ status, type = 'text' }: Props): JSX.Element => {
    const { isReduceAnimations } = useReduceAnimations();

    return <StatusBadge type={type} status={status} locale={useStatusText()} isReduceAnimations={isReduceAnimations} />;
};
