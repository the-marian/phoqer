import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { Intersection } from './intersection';

const meta: Meta<typeof Intersection> = {
    title: 'Other/Intersection',
    component: Intersection,
};

export default meta;

const styles = `<style>
.inner {
    height: 20rem;
    background: var(--primary-blue-500);
}
.content {
    display: flex;
    justify-content: center;
    padding: 2rem;
    height: 80vh;
    width: 100%;
    font-size: 2rem;
    background: var(--secondary-blue-500);
}
.separator {
    padding: 1rem 4rem;
}
</style>`;

export const Base = () => (
    <Wrapper title="Container" styles={styles}>
        <h2 className="subheading">Scroll down</h2>
        {[...Array(20)].map((_, index) => (
            <div key={index} className="separator">
                |
            </div>
        ))}

        <h2 className="subheading">Intersection once</h2>
        <Intersection once>
            {intersected => (
                <div className="content" style={{ background: intersected ? 'var(--secondary-blue-500)' : 'var(--gray-50)' }}>
                    {intersected ? 'Intersection once - True' : 'Intersection once - False'}
                </div>
            )}
        </Intersection>

        <h2 className="subheading">Intersection multiple</h2>
        <Intersection>
            {intersected => (
                <div className="content" style={{ background: intersected ? 'var(--secondary-blue-500)' : 'var(--gray-50)' }}>
                    {intersected ? 'Intersection multiple - True' : 'Intersection multiple - False'}
                </div>
            )}
        </Intersection>
    </Wrapper>
);
