import { render } from '../../../../../tests/tests.utils';
import ChatsLoader from './index';

describe('ChatsLoader component', () => {
    it('matches snapshot, without props', () => {
        const { asFragment } = render(<ChatsLoader />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with amount', () => {
        const { asFragment } = render(<ChatsLoader amount={5} />, {});
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot, with className', () => {
        const { asFragment } = render(<ChatsLoader amount={5} className="test" />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
