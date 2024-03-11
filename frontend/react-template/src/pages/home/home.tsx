import React, { useEffect } from 'react';

import { useOpen, Container, Link } from 'phoqer';
import { Appear } from 'phoqer-shared';

const HomePage = (): JSX.Element => {
    const aside = useOpen(false);

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                aside.onClose();
            }
        };

        if (aside) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [aside]);

    return (
        <Appear style={{ marginTop: 20 }}>
            <Container>
                <h1>React template</h1>

                <p style={{ marginTop: 20 }}>
                    <span style={{ marginRight: 10 }}>Open repository:</span>
                    <Link href="https://github.com/phoqer/react-template" target="_blank">
                        https://github.com/phoqer/react-template
                    </Link>
                </p>
            </Container>
        </Appear>
    );
};

export default HomePage;
