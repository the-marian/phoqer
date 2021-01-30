import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import FullPageModal from '../FullPageModal';

const useStyles = createUseStyles((theme: Theme) => ({
    modal: {
        display: 'block',
        width: '100vw',
        height: '100vh',
        objectFit: 'contain',
    },
    nav: {
        position: 'fixed',
        top: 0,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',

        '& button': {
            display: 'block',
            height: '100%',
            width: theme.rem(7),
            padding: theme.rem(1, 2),
            background: 'none',
            fontSize: theme.rem(0),
            color: theme.palette.white,

            '&:hover': {
                background: theme.palette.gray[4],
            },

            '& svg': {
                height: theme.rem(2),
                width: theme.rem(2),
            },
        },
    },
    count: {
        position: 'fixed',
        bottom: theme.rem(2),
        left: theme.rem(2),
        fontSize: theme.rem(1.4),
        color: theme.palette.white,
    },
}));

interface IProps {
    index?: number;
    images: string[];
}

const FullPageGallery = ({ index = 0, images }: IProps): ReactElement => {
    const css = useStyles();
    const [current, setCurrent] = useState(index);

    const next = (): void => {
        setCurrent(val => (val === images.length - 1 ? 0 : val + 1));
    };
    const prev = (): void => {
        setCurrent(val => (val === 0 ? images.length - 1 : val - 1));
    };

    const key: { [key: string]: () => void } = {
        ArrowRight: next,
        ArrowUp: next,
        Enter: next,
        Tab: next,
        Space: next,
        ArrowLeft: prev,
        ArrowDown: prev,
    };

    const handlePrev = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        prev();
    };
    const handleNext = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        next();
    };

    useEffect(() => {
        if (images.length > 1) {
            const handler = (event: KeyboardEvent): void => {
                event.preventDefault();
                key[event.code] && key[event.code]();
            };

            window.addEventListener('keydown', handler);
            return () => {
                window.removeEventListener('keydown', handler);
            };
        }
    }, []);

    return (
        <FullPageModal>
            <img
                className={css.modal}
                title={images.length > 1 ? 'Вы можете управлять галереей используя вашу клавиатуру' : null}
                src={images[current]}
                alt=""
            />
            {images.length > 1 && (
                <>
                    <nav title="Вы можете управлять галереей используя вашу клавиатуру" className={css.nav}>
                        <button type="button" onClick={handlePrev}>
                            <span>Prev</span>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button type="button" onClick={handleNext}>
                            <span>Next</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </nav>
                    <div className={css.count}>{`${current + 1} / ${images.length}`}</div>
                </>
            )}
        </FullPageModal>
    );
};

export default FullPageGallery;
