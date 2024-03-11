import { FC } from 'react';

import dynamic from 'next/dynamic';
import { TooltipProps } from 'phoqer';

const TooltipPhoqer = dynamic<TooltipProps>(() => import('phoqer').then(module => module.Tooltip), { ssr: false });

export const Tooltip: FC<TooltipProps> = ({ ...props }) => {
    return <TooltipPhoqer {...props} />;
};
