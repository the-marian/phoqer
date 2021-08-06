import { render } from '../../../../tests/tests.utils';
import JoinForm from './index';

describe('JoinForm component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<JoinForm />);
        expect(asFragment()).toMatchSnapshot();
    });
});
