import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { createUseStyles } from 'react-jss';

import Breadcrumbs from '../../../../components/common/breadcrumbs';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import Meta from '../../../../components/meta';
import routes from '../../../../utils/routes';

const ConfettiWrp = dynamic(() => import('../../../../components/common/confetti'), { ssr: false });

const useStyles = createUseStyles({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    box: {
        marginBottom: '4rem',
    },
    img: {
        width: '580px',
        height: '315px',
    },
});

const SecretPage = (): ReactElement => {
    const css = useStyles();

    return (
        <>
            <Meta title="НЕ ЛЕЗЬ, ОНА ТЕБЯ СОЖРЕТ!" />
            <PageLayout>
                <ConfettiWrp />
                <Container>
                    <Breadcrumbs end="НЕ ЛЕЗЬ, ОНА ТЕБЯ СОЖРЕТ!" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
                <Container>
                    <div className={css.flex}>
                        <iframe
                            className={css.box}
                            width="580"
                            height="315"
                            src="https://www.youtube.com/embed/pqqbYIc1PRw?controls=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <iframe
                            className={css.box}
                            width="580"
                            height="315"
                            src="https://www.youtube.com/embed/sxGPYaAFq2M"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video controls width="580" height="315" className={css.box}>
                            <source src="/meme.mp4" type="video/mp4" />
                            Sorry, your browser doesn&apos;t support embedded videos.
                        </video>
                    </div>
                </Container>
            </PageLayout>
        </>
    );
};

export default SecretPage;
