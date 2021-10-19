import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import useAdsIndex from '../../../hooks/ads-index.hook';
import { AdType } from '../../../interfaces';
import { Theme } from '../../../utils/theming/theme';

import adsMap from './ads.util';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0),
        maxHeight: theme.rem(40),
    },
}));

interface IProps {
    className?: string;
    type?: AdType;
}

const AdSense = ({ className, type = 'horizontal' }: IProps): ReactElement => {
    const css = useStyles();
    const index = useAdsIndex(type);

    return (
        <div className={clsx(css.root, className)}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2424155820333209"
                data-ad-slot={adsMap[type][index]}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
                }}
            />
        </div>
    );
};

export default AdSense;
