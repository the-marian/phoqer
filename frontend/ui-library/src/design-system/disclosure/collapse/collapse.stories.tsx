import { FC, PropsWithChildren } from 'react';

import { Meta } from '@storybook/react';
import { Switch } from 'src/design-system/inputs';
import { useIsOpen } from 'src/hooks';
import { Wrapper } from 'src/storybook/wrapper';

import { Collapse } from './collapse';

const meta: Meta<typeof Collapse> = {
    title: 'Disclosure/Collapse',
    component: Collapse,
};

export default meta;

const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium, amet assumenda atque doloremque dolorum ea earum eius enim explicabo fuga ipsum labore laborum, neque optio porro reprehenderit, voluptatem voluptatibus.';

const Inner: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div
            style={{
                width: '800px',
                marginTop: '20px',
                padding: '50px',
                fontSize: '16px',
                background: 'var(--secondary-blue-500)',
            }}
        >
            {children || lorem}
        </div>
    );
};

export const Base = () => {
    const root = useIsOpen();
    const inner = useIsOpen();

    return (
        <Wrapper title="Collapse">
            <Switch label="Toggle collapse panel" checked={root.isOpen} onChange={root.onToggle} />

            <Collapse isOpen={root.isOpen}>
                <Inner>
                    <p style={{ marginBottom: '20px' }}>{lorem}</p>
                    <Switch label="Toggle inner collapse panel" checked={inner.isOpen} onChange={inner.onToggle} />

                    <Collapse isOpen={inner.isOpen}>
                        <p style={{ marginTop: '20px' }}>{lorem}</p>
                    </Collapse>
                </Inner>
            </Collapse>

            <Inner />
        </Wrapper>
    );
};
