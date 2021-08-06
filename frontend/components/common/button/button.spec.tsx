import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../../tests/tests.utils';
import Button from './index';

describe('Test Button component', () => {
    it('Should match snapshot', () => {
        const { asFragment } = render(<Button>test</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('Should match snapshot', () => {
        const { asFragment } = render(
            <Button className="test" type="submit" loading>
                test
            </Button>,
            {},
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('Test onClick', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>test</Button>, {});
        fireEvent.click(screen.getByRole(/button/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
