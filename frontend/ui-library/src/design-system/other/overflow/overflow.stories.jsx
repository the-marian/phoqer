import { Text } from 'src/design-system/foundation';
import { LongText } from 'src/storybook/long-text';
import { Wrapper } from 'src/storybook/wrapper';

import { Overflow } from './overflow';

export default {
    title: 'Other/Overflows',
    component: Overflow,
};

const styles = `<style>
.overflow {
    width: 500px;
    max-height: 250px;
    margin-bottom: 40px;
}

</style>`;

export const Overflows = () => (
    <Wrapper title="Overflow" styles={styles}>
        <Overflow className="overflow">
            <Text>Small content. No Overflow</Text>
        </Overflow>

        <hr />
        <br />

        <Overflow className="overflow">
            <LongText count={10} style={{ marginBottom: '15px', fontSize: '16px' }} />
        </Overflow>
    </Wrapper>
);
