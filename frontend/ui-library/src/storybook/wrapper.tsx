import { ReactNode, useEffect, useState } from 'react';

import { ReduceAnimationsProvider } from 'src/context';
import { Heading } from 'src/design-system/foundation';
import { LightIcon } from 'src/design-system/icons';
import { IconButton } from 'src/design-system/inputs';
import { Flex } from 'src/design-system/layout';

const baseStyles = `<style>
.sbdocs .docs-story {
    background: var(--body);
}
.Wrapper-wrp {
    padding: 20px;
}
.Wrapper-header {
    margin: 0 2rem 2rem;
    padding: 3rem 0;
    border-bottom: 0.1rem solid var(--black);
}
.Wrapper-end {
    height: 50px;
}
.grid {
    --grid-border-color: var(--black);
    --grid-border-type: dashed;
}
.grid-item {
    padding: 3rem;
    color: var(--black);
}
</style>`;

interface Props {
    children: ReactNode;
    title: string;
    styles?: string;
}

export const Wrapper = ({ children, title, styles }: Props) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'white');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggle = () => setTheme(prev => (prev === 'white' ? 'black' : 'white'));

    return (
        <ReduceAnimationsProvider>
            <div dangerouslySetInnerHTML={{ __html: baseStyles }} />
            {styles && <div dangerouslySetInnerHTML={{ __html: styles }} />}

            <Flex as="header" className="Wrapper-header" justify="space-between" align="center">
                <Heading as="h1" size="xl" weight={700} className="Wrapper-heading">
                    {title}
                </Heading>

                <IconButton size="lg" isFilled label="change theme" onClick={toggle}>
                    <LightIcon />
                </IconButton>
            </Flex>

            <div className="Wrapper-wrp">{children}</div>

            <div className="Wrapper-end" />
        </ReduceAnimationsProvider>
    );
};
