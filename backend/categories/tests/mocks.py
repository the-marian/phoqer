sport_img_url = 'https://example.com/sport.jpeg'
books_img_url = 'https://example.com/books.jpeg'
toys_img_url = 'https://example.com/toys.jpeg'
categories_endpoint_url = '/api/v1/categories/'

list_categories_expected_response = [
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
    {
        'name': 'Toys',
        'slug': 'toys',
        'image': toys_img_url,
        'sub_categories': [
            {
                'name': 'Yo-yo',
                'slug': 'yo-yo',
            },
            {
                'name': 'Chess',
                'slug': 'chess',
            },
        ]
    },
]

list_categories_without_toys = [
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
]

list_categories_ordered_by_priority = [
    {
        'name': 'Toys',
        'slug': 'toys',
        'image': toys_img_url,
        'sub_categories': [
            {
                'name': 'Yo-yo',
                'slug': 'yo-yo',
            },
            {
                'name': 'Chess',
                'slug': 'chess',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
]
