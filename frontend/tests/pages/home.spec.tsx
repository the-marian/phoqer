import Home from '../../pages';
import { render } from '../tests.utils';

describe('Home component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    });
});
