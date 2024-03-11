import { Meta } from '@storybook/react';
import { LongText } from 'src/storybook/long-text';
import { Wrapper } from 'src/storybook/wrapper';

import { Scroll } from './scroll';

const meta: Meta<typeof Scroll> = {
    title: 'Layout/Scroll',
    component: Scroll,
};

export default meta;

const styles = `<style>
.subheader {
    margin-bottom: 2rem;
}
</style>`;

export const Base = () => (
    <Wrapper title="Scrolls | Base" styles={styles}>
        <Scroll style={{ height: 400, width: 400, border: '1px solid var(--black)' }}>
            <LongText count={5} style={{ margin: '2rem', fontSize: '1.8rem' }} />
        </Scroll>
    </Wrapper>
);
