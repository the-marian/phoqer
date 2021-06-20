import { Loader } from '@googlemaps/js-api-loader';
import React, { ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../assets/config';
import locations from '../../../assets/map';
import { Theme } from '../../../theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    map: {
        height: theme.rem(40),
        width: '100%',
        borderRadius: theme.radius,
        margin: theme.rem(4, 0),
    },
}));

interface IProps {
    city: string;
}

const GoogleMap = ({ city }: IProps): ReactElement => {
    const css = useStyles();
    const ref = useRef<HTMLDivElement | null>(null);

    const map = useRef<google.maps.Map | null>(null);
    const loader = useRef<Loader | null>(null);
    const marker = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        const connect = async (html: HTMLDivElement): Promise<void> => {
            if (!loader.current)
                loader.current = new Loader({
                    apiKey: config.googleApiKey as string,
                    version: 'weekly',
                });

            await loader.current.load();

            const position = () => ({
                lat: locations[city][0],
                lng: locations[city][1],
            });

            map.current = new google.maps.Map(html, {
                center: position(),
                zoom: 12,
            });

            marker.current = new google.maps.Marker({
                position: position(),
                map: map.current,
            });
        };
        if (ref.current && city) connect(ref.current).catch(error => console.error(error));

        return () => {
            loader.current = null;
            map.current = null;
            marker.current = null;
        };
    }, [ref, loader, city]);

    return <div className={css.map} ref={ref} />;
};

export default GoogleMap;
