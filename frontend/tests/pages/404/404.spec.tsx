import ErrorPage from '../../../pages/404';
import { render } from '../../tests.utils';

describe('Home component', () => {
    it('match snapshot', () => {
        const { asFragment } = render(<ErrorPage />);
        expect(asFragment()).toMatchSnapshot();
    });
});
