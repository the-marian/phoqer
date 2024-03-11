import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { About } from './about';

const meta: Meta<typeof About> = {
    title: 'Templates/About',
    component: About,
};

export default meta;

export const Default = () => (
    <Wrapper title="About">
        <About src="/about.jpeg" description="Портал для аренды и проката товаров и услуг" />
    </Wrapper>
);
