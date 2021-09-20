import { IOfferCard } from '../../interfaces';

window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
}));

window.scrollTo = jest.fn();

jest.mock('react-confetti', () => () => null);

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        locale: 'en',
    })),
    Router: {
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
    },
}));

export const mockSingleOffer: IOfferCard = {
    id: 'test-id',
    can_rent: true,
    category: 'sport',
    sub_category: null,
    deposit_val: 1000,
    min_rent_period: 1,
    max_rent_period: 10,
    pub_date: '01-01-2020',
    cover_image: 'www.example.com/image.jpg',
    images: ['www.example.com/image.jpg', 'www.example.com/image2.jpg'],
    rental_period: 'DAY',
    functions: ['DO_INACTIVE', 'ARCHIVE', 'PROMOTE', 'EDIT', 'DELETE', 'DO_REVIEW'],
    is_favorite: true,
    is_promoted: true,
    is_deliverable: true,
    doc_needed: true,
    price: 1000,
    title: 'Test title',
    views: 1000,
    description: 'Test description',
    extra_requirements: 'None',
    city: 'kyiv',
    country: 'ukraine',
    currency: 'UAH',
    author_id: 1,
    status: 'ACTIVE',
};
