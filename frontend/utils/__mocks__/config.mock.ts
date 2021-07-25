import { ICategories, IDropList } from '../../interfaces';

export const authCookies = 'phoqer_auth={%22loading%22:false%2C%22access_token%22:null}';

export const siteCookies =
    'phoqer_auth={%22loading%22:false%2C%22access_token%22:null};phoqer_config={%22warning%22:false%2C%22hideSearchFilters%22:true%2C%22hideTopSearchQuery%22:true%2C%22hideTopOffers%22:true}';

export const siteCookiesReverse =
    'phoqer_config={%22warning%22:false%2C%22hideSearchFilters%22:true%2C%22hideTopSearchQuery%22:true%2C%22hideTopOffers%22:true};phoqer_auth={%22loading%22:false%2C%22access_token%22:null};';

export const catList: ICategories[] = [
    {
        icon_image: 'test1',
        image: 'test1',
        slug: 'test1',
    },
    {
        icon_image: 'test2',
        image: 'test2',
        slug: 'test2',
    },
    {
        icon_image: 'test3',
        image: 'test3',
        slug: 'test3',
        sub_category: [
            {
                icon_image: 'test3.1',
                image: 'test3.1',
                slug: 'test3.1',
            },
            {
                icon_image: 'test3.2',
                image: 'test3.2',
                slug: 'test3.2',
            },
        ],
    },
];

export const dropValue: IDropList[] = [
    {
        icon_image: 'test1',
        image: 'test1',
        slug: 'test1',
    },
    {
        slug: 'test2',
        icon_image: 'test2',
        image: 'test2',
    },
    {
        slug: 'test3',
        icon_image: 'test3',
        image: 'test3',
        sub: [
            {
                icon_image: 'test3.1',
                image: 'test3.1',
                slug: 'test3.1',
            },
            {
                icon_image: 'test3.2',
                image: 'test3.2',
                slug: 'test3.2',
            },
        ],
    },
];
