import { render } from '../../../tests/tests.utils';

import Tooltip from './index';

describe('Tooltip component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(
            <Tooltip content="test">
                <p>test</p>
            </Tooltip>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(
            <Tooltip content={<p>test</p>}>
                <p>test</p>
            </Tooltip>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot', () => {
        const { asFragment } = render(
            <Tooltip className="test" content={<p>test</p>}>
                <p>test</p>
            </Tooltip>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
