import { render } from '../../../tests/tests.utils';

import { longList, shortList } from './__mocks__/breadcrumbs.mock';

import Breadcrumbs from './index';

describe('Test Breadcrumbs component', () => {
    it('Should match snapshot', () => {
        const { asFragment } = render(<Breadcrumbs data={longList} end="end" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Should match snapshot', () => {
        const { asFragment } = render(<Breadcrumbs data={shortList} end="end" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Should match snapshot', () => {
        const { asFragment } = render(<Breadcrumbs data={shortList} className="test" end="end" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
