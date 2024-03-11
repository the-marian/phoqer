import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { Background } from './background';

const meta: Meta<typeof Background> = {
    title: 'Media/Background',
    component: Background,
};

export default meta;

const styles = `<style>
.box {
    position: relative;
    height: 70rem;
    width: 70rem;
}
</style>`;

export const Base = () => {
    return (
        <Wrapper title="Background" styles={styles}>
            <div className="box">
                <Background border />
            </div>
        </Wrapper>
    );
};
