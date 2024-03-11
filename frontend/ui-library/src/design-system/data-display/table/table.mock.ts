import { Offer } from 'src/types';

export const headerTitleMap: Record<string, string> = {
    details: 'Details',
    title: 'Title',
    description: 'Description',
    images: 'Images',
    price: 'Price',
    sale: 'Sale',
    sale_description: 'Sale Description',
    category: 'Category',
};

export const headerOrder: string[] = [
    'details',
    'images',
    'title',
    'description',
    'price',
    'sale',
    'sale_description',
    'category',
];

export const sizeMap: Record<string, number> = {
    id: 3,
    title: 35,
    images: 10,
    details: 15,
    description: 50,
    sale_description: 40,
};

export const data: Offer[] = [
    {
        id: 20,
        title: 'iPhone 12 Pro Max Graphite 256 GB',
        description:
            'iPhone 12 Pro Max Graphite 256 GB по СУПЕР цене с гарантией 3 месяца!!<br>\n<br>\nСэкономь на покупке до 2000 грн уже сейчас !<br>\n<br>\nХорошее состояние телефона<br>\nРаботают со всеми операторами как Neverlock!<br>\nВозможен обмен Вашего старого iPhone на новый и мы оценим Ваш телефон дороже на 30 % чем у других магазинах.<br>\n<br>\nЦена всего - 1099$<br>\n<br>\nПри покупке вы гарантированно получите:<br>\n- Гарантию до 2 лет<br>\n- Гарантию возврата денег<br>\n- Сертификат на 350 грн<br>\n- Поддержку 24/7<br>\n- Скидку 50 % на защитные аксессуары<br>\n<br>\nО нас<br>\n<br>\n- Более 8 лет на рынке<br>\n- Более 20.000 довольных клиентов\u2028<br>\n<br>\nПишите и на Viber/Telegram 38********94',
        images: [
            'https://images.unsplash.com/photo-1604073383776-7417193d93a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1616865609199-abb1465abf5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1612696874005-d015469bc660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
        ],
        price: 900,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 21,
        title: 'iPhone 12 Pro 128 GB',
        description:
            'iPhone 12 Pro 128 GB по СУПЕР цене с гарантией 3 месяца!!<br>\nВ подарок идут защитное стекло и Silicon Case на ваш iPhone<br>\n<br>\nСэкономь на покупке до 2000 грн уже сейчас !<br>\n<br>\nИдеальное состояние<br>\nРаботают со всеми операторами как Neverlock!<br>\nВозможен обмен Вашего старого iPhone на новый и мы оценим Ваш телефон дороже на 30 % чем у других магазинах.<br>\n<br>\nЦена всего - 899$<br>\n<br>\nПри покупке вы гарантированно получите:<br>\n- Гарантию до 2 лет<br>\n- Гарантию возврата денег<br>\n- Сертификат на 350 грн<br>\n- Поддержку 24/7<br>\n- Скидку 50 % на защитные аксессуары<br>\n<br>\nО нас<br>\n<br>\n- Более 8 лет на рынке<br>\n- Более 20.000 довольных клиентов\u2028<br>\n<br>\nПишите и на Viber/Telegram 38********94',
        images: [
            'https://images.unsplash.com/photo-1610602699116-95aab7d9290b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1609001650223-aa7d7edccac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1610602699083-1d70b860505b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1609001732440-0d1768eb13b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 750,
        sale: {
            percentage: 5,
            description: 'Получите 5% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 22,
        title: 'iPhone 11 Pro Max 64gb Midnight Green',
        description:
            'Продам iPhone 11 Pro Max Midnight Green 64gb<br>\nЕмкость батареи 85%, аккумулятор держит целый день при активном использовании<br>\nСостояние идеальное<br>\nКомплект: телефон, зарядка, коробка<br>\nFace ID, Tru Tone и все другие функции работают идеально',
        images: [
            'https://images.unsplash.com/photo-1581795648171-e42ceb106d0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 500,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 23,
        title: 'iPhone 11 Pro Max 256Gb Space gray Neverlock',
        description:
            'Гарантия, Кредит, Обмен (обмен вашего старого iPhone с доплатой (Trade - in), Оплата частями.<br>\n<br>\nСвои вопросы вы можете задать менеджерам: <br>\n- на нашей странице в инстаграм: www.instagram.com/i.zoomer  <br>\n- по телефону, что указан в данном объявлении<br>\n- написать нам на olx<br>\n- или приехать в магазин izoomer г. Черкассы, бул. Шевченка 266 (здание Облагробуд).<br>\n<br>\nNeverlock - означает что телефон не привязан ни к какому оператору и может использоваться с любой симкой.<br>\n<br>\nКосметическое состояние: 10 с 10. Весь в оригинале. В воде не был, в ремонтах не был.<br>\nФункционал: на 10 с 10. iCloud чистый. Работает с любой симкой. Все функции работают без проблем.<br>\nКомплект: телефон, usb шнур оригинал, з.у. в розетку оригинал, родная коробка.<br>\nНа проверку работоспособности, что бы вы убедились, что все работает отлично, мы предоставляем гарантию на 1 месяц! Выдадим вам гарантийный талон, выписан на ваше имя. Мы уверены в своем товаре, потому скрывать нечего!<br>\n<br>\nТак же можете просмотреть остальные товары нажав на ссылку справа "Другие объявления автора".',
        images: [
            'https://images.unsplash.com/photo-1603898037225-1bea09c550c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
            'https://images.unsplash.com/photo-1600262606369-acb8a2cf69fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1581795669633-91ef7c9699a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 400,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 24,
        title: 'iPhone 12 64gb Blue',
        description:
            'iPhone 12 на 64гб в синем цвете<br>\nСостояние идеальное, нового телефона<br>\nЕсть гарантия от магазина<br>\nВ наличии большой выбор телефонов<br>\nЕсть разные цвета<br>\n<br>\nУточняйте актуальную цену на интересующий вас цвет, объем памяти!<br>\nРаботаем более 8 лет, более тысячи довольных покупателей!<br>\n<br>\n&gt; TRADE IN<br>\nДопоможемо вигідно обміняти вживану техніку на нову<br>\nОцінка займає 5 хвилин<br>\nТакож ми викупаємо вашу стару техніку за гарною ціною<br>\n<br>\n&gt; Графік роботи<br>\nПрацюємо без вихідних<br>\nПн-Пт: с 10:00 до 18:00<br>\nСб-Вс: с 11:00 до 18:00<br>\n<br>\nНаш магазин Storeinua знаходиться у м. Львів та м.Київ<br>\nМожете завітати до магазину<br>\nТакож ми працюємо на доставку по Львову<br>\nТа відправляємо поштою по Україні<br>\n<br>\nНаш сайт: Storeinua.com<br>\nВідгуки в Google, Hotline, Facebook<br>\nЗаймаємося продажем Apple техніки з 2010 року<br>\n<br>\nЗнижка на аксесуари до 30%<br>\nТакож можемо перенести ваші дані зі старого айфону на новий',
        images: [
            'https://images.unsplash.com/photo-1642944082901-4eead3110f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2898&q=80',
            'https://images.unsplash.com/photo-1621501473804-cda119b38378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80',
            'https://images.unsplash.com/photo-1607660499734-43a032950ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2573&q=80',
            'https://images.unsplash.com/photo-1642944082139-0568f49d8514?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3413&q=80',
        ],
        price: 700,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 25,
        title: 'iPhone 12 Pro 128Gb Pacific Blue/Синий',
        description:
            'iPhone 12 pro 128gb в синем цвете<br>\n<br>\nСтан телефону в нас ідеал/ наближений до ідеалу<br>\nКожен Телефон протестовано нашими фахівцями<br>\nДаємо гарантію від магазину на 1 міс.<br>\nЄ комплект : Телефон, Коробка, Шнур та Блок<br>\nТехніка ніколи не ремонтувалася/ не вскривалася<br>\nПрацюють всі функції<br>\nТелефоні Neverlock - працюють з усіма сім картами<br>\n<br>\nВ нас ви зможете:<br>\n<br>\nКупити , продати та  обміняти продукцію Apple<br>\n<br>\n&gt; TRADE IN<br>\nДопоможемо вигідно обміняти вживану техніку на нову<br>\nОцінка займає 5 хвилин<br>\nТакож ми викупаємо вашу стару техніку за гарною ціною<br>\n<br>\n&gt; Графік роботи<br>\nПрацюємо без вихідних<br>\nПн-Пт: с 10:00 до 18:00<br>\nСб-Вс: с 11:00 до 18:00<br>\n<br>\nНаш магазин Storeinua знаходиться у м. Львів та м.Київ<br>\nМожете завітати до магазину у м. Львів<br>\nАдреса: Проспект В. Чорновола 17<br>\nТакож ми працюємо на доставку по Львову<br>\nТа відправляємо поштою по Україні<br>\n<br>\nНаш сайт: Storeinua.com<br>\nВідгуки в Google, Hotline, Facebook<br>\nЗаймаємося продажем Apple техніки з 2010 року<br>\n<br>\nЗнижка на аксесуари до 30%<br>\nТакож можемо перенести ваші дані зі старого айфону на новий',
        images: [
            'https://images.unsplash.com/photo-1604709474273-bfbf38fa649c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
            'https://images.unsplash.com/photo-1623621723875-8e5fe0eb1346?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1603946877690-d410437c29aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1606088295735-d8148a172c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3056&q=80',
            'https://images.unsplash.com/photo-1605636808063-ba999ff935eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1605172941518-97c3f9eb9b75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1616876195047-522271be4e66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 860,
        sale: {
            percentage: 15,
            description: 'Получите 15% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 26,
        title: 'NEW iPhone 13 Pro Max 128\\256\\512Gb\\1TB(UA)',
        description:
            'Магазин Ябко  пропонує нові Apple iPhone 13 Pro Max 128\\256\\512gb\\1 TB Neverlock<br>\n<br>\nВ наявності або під замовлення всі кольори та об’єми пам’яті .<br>\n<br>\nВеликий асортимент аксесуарів та завжди приємні знижки та емоції)<br>\nНадається гарантія до двох років.<br>\n<br>\nТехніку можна оглянути вживу в нашому магазині. <br>\nНаша адреса: <br>\nм.Стрий Шевченка 56 магазин Ябко.<br>\n<br>\nТакож зверніть увагу і на інші оголошення від нашого магазину Ябко! За деталями в приватні повідомлення.',
        images: [
            'https://images.unsplash.com/photo-1640437830863-8f7f38327319?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1640437830866-d5da33f66a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1637193080311-a6e6e11f0e00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1639275218818-9637b42e6cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
            'https://images.unsplash.com/photo-1636032204208-fdd9d7b11394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1632505084039-f8ec4b00e432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1634618774956-36f5b1618be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 700,
        sale: {
            percentage: 10,
            description: 'Получите 10% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 10,
        title: 'Ford focus 3, 2015 года. Семейная',
        description:
            'Ford Focus 3, 2015 года <br> Поддержаний автомобиль в хорошем состоянии !<br> Собственное авто, пригонял для себя! <br> Повреждение были минимальные.<br> Основные ++++ после пригона -это целая безопасность!!<br><br> Дополнительно установил защиту двигателя, противотуманки.<br> Масло в моторе меняю вовремя.<br> Заменил масло в коробке.<br> Автомобиль не привередлив в обслуживании.<br> Расход реальный по трассе:<br> 6 литров(110-120км/час)<br> По городу-10-11 литров.<br>  Пробег 130тыс..<br> Мультимедиа достойная, есть камера заднего вида, кондиционер, помощь при подъёме  и другое.<br> Хранение в подземном паркинге!<br><br> По всем интересующим вопросам звоните-с удовольствием отвечу!<br> Переоформление в мреэ',
        images: [
            'https://images.unsplash.com/photo-1582467029543-8d5b719a1236?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1558787503-311fdac114af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80',
        ],
        price: 1500,
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 11,
        title: 'Hyundai sonata 2017 LPI',
        description:
            'Продам свою машину в отличном состоянии! Машина пригнана из Кореи, заводской газ! В феврале сделано ТО.  Коробка не пинает, переключает передачи четко! Двигатель работает ровно. В ДТП не была, в родной краске везде.  Остался видео обзор с аукциона, который делали перед покупкой, машина ровно в том же состоянии.  Пробег 179000 км, чистый 2017 год, заводской газ, салон, карты дверей, багажник, подкапотное пространство, всё в отличном состоянии!  Кожаный руль; кожаный салон,безключевой доступ; подогревы руля, передних сидений, кнопка старт/стоп заводская, круиз контроль.  Передний и задний видеорегистратор и третий родной лежит, полноценная запаска.  Это действительно комфортный автомобиль во всём, есть с чем сравнить! Просто огромный салон, удобные сиденья.  Из минусов, есть маленькие, не глубокие сколы и царапины внизу кузова и небольшая дента на задней правой двери.  На фото все дефекты видны. Перекупам, просьба не беспокоить, мне не горит и цену своей машине я знаю!  Машиной будете реально довольны!!! Есть вопросы- звони, пиши, скину доп фото/видео. ',
        images: [
            'https://images.unsplash.com/photo-1633359064754-804ba55e733f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 2200,
        sale: {
            percentage: 10,
            description: 'Получите 10% скидки до 30.09.2022',
        },
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 12,
        title: 'Bmw x6 2017 Официальный',
        description:
            'Продам BMW X6 2017 год. 3.0 бензин. <br> Куплена у Официального дилера в Киеве на АВТ!<br> По комплектации: <br> Хорошие сиденья с регулировками.<br> Полностью все в коже,торпеда карты дверей . <br> Автоматически дальний свет<br> Подсветка по салону. <br> Подогрев сидений <br> Подогрев руля<br> Проекция <br> Лед приборка <br> Полный Заводской М-пакет<br> Камера заднего вида <br> Парктроники <br> Датчики слепых зон <br> Датчик дождя <br> Датчик света <br> Круиз <br>И многое другое …<br><br> По машине все идеально, делать ничего не нужно, обслуживание и все ТО у официального дилера. Других СТО машина никогда! <br> На машине поменяны все жидкости по регламенту. Последнее ТО было 1000 км назад. <br> Машина никаких вложений не требует! <br> Вся передняя часть авто в пленке, зоны под ручками торцы дверей,зеркала,стойки все в полеуретановой пленке. <br> Машина покрыта керамикой. <br> По салону вся кожа все было обработано составом для кожи! <br> В комплекте 2 комплекта оригинальных дисков с резиной. Зимний комплект покупали у официального дилера за 5000$! На авто установлено дорогая сигнализация Бениш !',
        images: [
            'https://images.unsplash.com/photo-1550966286-463de289b622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 4000,
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 120,
        title: 'iPhone 12 Pro Max Graphite 256 GB',
        description:
            'iPhone 12 Pro Max Graphite 256 GB по СУПЕР цене с гарантией 3 месяца!!<br>\n<br>\nСэкономь на покупке до 2000 грн уже сейчас !<br>\n<br>\nХорошее состояние телефона<br>\nРаботают со всеми операторами как Neverlock!<br>\nВозможен обмен Вашего старого iPhone на новый и мы оценим Ваш телефон дороже на 30 % чем у других магазинах.<br>\n<br>\nЦена всего - 1099$<br>\n<br>\nПри покупке вы гарантированно получите:<br>\n- Гарантию до 2 лет<br>\n- Гарантию возврата денег<br>\n- Сертификат на 350 грн<br>\n- Поддержку 24/7<br>\n- Скидку 50 % на защитные аксессуары<br>\n<br>\nО нас<br>\n<br>\n- Более 8 лет на рынке<br>\n- Более 20.000 довольных клиентов\u2028<br>\n<br>\nПишите и на Viber/Telegram 38********94',
        images: [
            'https://images.unsplash.com/photo-1604073383776-7417193d93a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1616865609199-abb1465abf5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1612696874005-d015469bc660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
        ],
        price: 900,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 121,
        title: 'iPhone 12 Pro 128 GB',
        description:
            'iPhone 12 Pro 128 GB по СУПЕР цене с гарантией 3 месяца!!<br>\nВ подарок идут защитное стекло и Silicon Case на ваш iPhone<br>\n<br>\nСэкономь на покупке до 2000 грн уже сейчас !<br>\n<br>\nИдеальное состояние<br>\nРаботают со всеми операторами как Neverlock!<br>\nВозможен обмен Вашего старого iPhone на новый и мы оценим Ваш телефон дороже на 30 % чем у других магазинах.<br>\n<br>\nЦена всего - 899$<br>\n<br>\nПри покупке вы гарантированно получите:<br>\n- Гарантию до 2 лет<br>\n- Гарантию возврата денег<br>\n- Сертификат на 350 грн<br>\n- Поддержку 24/7<br>\n- Скидку 50 % на защитные аксессуары<br>\n<br>\nО нас<br>\n<br>\n- Более 8 лет на рынке<br>\n- Более 20.000 довольных клиентов\u2028<br>\n<br>\nПишите и на Viber/Telegram 38********94',
        images: [
            'https://images.unsplash.com/photo-1610602699116-95aab7d9290b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1609001650223-aa7d7edccac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1610602699083-1d70b860505b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1609001732440-0d1768eb13b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 750,
        sale: {
            percentage: 5,
            description: 'Получите 5% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 122,
        title: 'iPhone 11 Pro Max 64gb Midnight Green',
        description:
            'Продам iPhone 11 Pro Max Midnight Green 64gb<br>\nЕмкость батареи 85%, аккумулятор держит целый день при активном использовании<br>\nСостояние идеальное<br>\nКомплект: телефон, зарядка, коробка<br>\nFace ID, Tru Tone и все другие функции работают идеально',
        images: [
            'https://images.unsplash.com/photo-1581795648171-e42ceb106d0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 500,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 123,
        title: 'iPhone 11 Pro Max 256Gb Space gray Neverlock',
        description:
            'Гарантия, Кредит, Обмен (обмен вашего старого iPhone с доплатой (Trade - in), Оплата частями.<br>\n<br>\nСвои вопросы вы можете задать менеджерам: <br>\n- на нашей странице в инстаграм: www.instagram.com/i.zoomer  <br>\n- по телефону, что указан в данном объявлении<br>\n- написать нам на olx<br>\n- или приехать в магазин izoomer г. Черкассы, бул. Шевченка 266 (здание Облагробуд).<br>\n<br>\nNeverlock - означает что телефон не привязан ни к какому оператору и может использоваться с любой симкой.<br>\n<br>\nКосметическое состояние: 10 с 10. Весь в оригинале. В воде не был, в ремонтах не был.<br>\nФункционал: на 10 с 10. iCloud чистый. Работает с любой симкой. Все функции работают без проблем.<br>\nКомплект: телефон, usb шнур оригинал, з.у. в розетку оригинал, родная коробка.<br>\nНа проверку работоспособности, что бы вы убедились, что все работает отлично, мы предоставляем гарантию на 1 месяц! Выдадим вам гарантийный талон, выписан на ваше имя. Мы уверены в своем товаре, потому скрывать нечего!<br>\n<br>\nТак же можете просмотреть остальные товары нажав на ссылку справа "Другие объявления автора".',
        images: [
            'https://images.unsplash.com/photo-1603898037225-1bea09c550c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
            'https://images.unsplash.com/photo-1600262606369-acb8a2cf69fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1581795669633-91ef7c9699a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        ],
        price: 400,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 124,
        title: 'iPhone 12 64gb Blue',
        description:
            'iPhone 12 на 64гб в синем цвете<br>\nСостояние идеальное, нового телефона<br>\nЕсть гарантия от магазина<br>\nВ наличии большой выбор телефонов<br>\nЕсть разные цвета<br>\n<br>\nУточняйте актуальную цену на интересующий вас цвет, объем памяти!<br>\nРаботаем более 8 лет, более тысячи довольных покупателей!<br>\n<br>\n&gt; TRADE IN<br>\nДопоможемо вигідно обміняти вживану техніку на нову<br>\nОцінка займає 5 хвилин<br>\nТакож ми викупаємо вашу стару техніку за гарною ціною<br>\n<br>\n&gt; Графік роботи<br>\nПрацюємо без вихідних<br>\nПн-Пт: с 10:00 до 18:00<br>\nСб-Вс: с 11:00 до 18:00<br>\n<br>\nНаш магазин Storeinua знаходиться у м. Львів та м.Київ<br>\nМожете завітати до магазину<br>\nТакож ми працюємо на доставку по Львову<br>\nТа відправляємо поштою по Україні<br>\n<br>\nНаш сайт: Storeinua.com<br>\nВідгуки в Google, Hotline, Facebook<br>\nЗаймаємося продажем Apple техніки з 2010 року<br>\n<br>\nЗнижка на аксесуари до 30%<br>\nТакож можемо перенести ваші дані зі старого айфону на новий',
        images: [
            'https://images.unsplash.com/photo-1642944082901-4eead3110f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2898&q=80',
            'https://images.unsplash.com/photo-1621501473804-cda119b38378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80',
            'https://images.unsplash.com/photo-1607660499734-43a032950ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2573&q=80',
            'https://images.unsplash.com/photo-1642944082139-0568f49d8514?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3413&q=80',
        ],
        price: 700,
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 125,
        title: 'iPhone 12 Pro 128Gb Pacific Blue/Синий',
        description:
            'iPhone 12 pro 128gb в синем цвете<br>\n<br>\nСтан телефону в нас ідеал/ наближений до ідеалу<br>\nКожен Телефон протестовано нашими фахівцями<br>\nДаємо гарантію від магазину на 1 міс.<br>\nЄ комплект : Телефон, Коробка, Шнур та Блок<br>\nТехніка ніколи не ремонтувалася/ не вскривалася<br>\nПрацюють всі функції<br>\nТелефоні Neverlock - працюють з усіма сім картами<br>\n<br>\nВ нас ви зможете:<br>\n<br>\nКупити , продати та  обміняти продукцію Apple<br>\n<br>\n&gt; TRADE IN<br>\nДопоможемо вигідно обміняти вживану техніку на нову<br>\nОцінка займає 5 хвилин<br>\nТакож ми викупаємо вашу стару техніку за гарною ціною<br>\n<br>\n&gt; Графік роботи<br>\nПрацюємо без вихідних<br>\nПн-Пт: с 10:00 до 18:00<br>\nСб-Вс: с 11:00 до 18:00<br>\n<br>\nНаш магазин Storeinua знаходиться у м. Львів та м.Київ<br>\nМожете завітати до магазину у м. Львів<br>\nАдреса: Проспект В. Чорновола 17<br>\nТакож ми працюємо на доставку по Львову<br>\nТа відправляємо поштою по Україні<br>\n<br>\nНаш сайт: Storeinua.com<br>\nВідгуки в Google, Hotline, Facebook<br>\nЗаймаємося продажем Apple техніки з 2010 року<br>\n<br>\nЗнижка на аксесуари до 30%<br>\nТакож можемо перенести ваші дані зі старого айфону на новий',
        images: [
            'https://images.unsplash.com/photo-1604709474273-bfbf38fa649c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
            'https://images.unsplash.com/photo-1623621723875-8e5fe0eb1346?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1603946877690-d410437c29aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1606088295735-d8148a172c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3056&q=80',
            'https://images.unsplash.com/photo-1605636808063-ba999ff935eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1605172941518-97c3f9eb9b75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1616876195047-522271be4e66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 860,
        sale: {
            percentage: 15,
            description: 'Получите 15% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 126,
        title: 'NEW iPhone 13 Pro Max 128\\256\\512Gb\\1TB(UA)',
        description:
            'Магазин Ябко  пропонує нові Apple iPhone 13 Pro Max 128\\256\\512gb\\1 TB Neverlock<br>\n<br>\nВ наявності або під замовлення всі кольори та об’єми пам’яті .<br>\n<br>\nВеликий асортимент аксесуарів та завжди приємні знижки та емоції)<br>\nНадається гарантія до двох років.<br>\n<br>\nТехніку можна оглянути вживу в нашому магазині. <br>\nНаша адреса: <br>\nм.Стрий Шевченка 56 магазин Ябко.<br>\n<br>\nТакож зверніть увагу і на інші оголошення від нашого магазину Ябко! За деталями в приватні повідомлення.',
        images: [
            'https://images.unsplash.com/photo-1640437830863-8f7f38327319?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1640437830866-d5da33f66a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
            'https://images.unsplash.com/photo-1637193080311-a6e6e11f0e00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1639275218818-9637b42e6cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80',
            'https://images.unsplash.com/photo-1636032204208-fdd9d7b11394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1632505084039-f8ec4b00e432?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1634618774956-36f5b1618be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
            'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 700,
        sale: {
            percentage: 10,
            description: 'Получите 10% скидки до 30.09.2022',
        },
        category: { slug: 'phone', title: 'Phones' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 110,
        title: 'Ford focus 3, 2015 года. Семейная',
        description:
            'Ford Focus 3, 2015 года <br> Поддержаний автомобиль в хорошем состоянии !<br> Собственное авто, пригонял для себя! <br> Повреждение были минимальные.<br> Основные ++++ после пригона -это целая безопасность!!<br><br> Дополнительно установил защиту двигателя, противотуманки.<br> Масло в моторе меняю вовремя.<br> Заменил масло в коробке.<br> Автомобиль не привередлив в обслуживании.<br> Расход реальный по трассе:<br> 6 литров(110-120км/час)<br> По городу-10-11 литров.<br>  Пробег 130тыс..<br> Мультимедиа достойная, есть камера заднего вида, кондиционер, помощь при подъёме  и другое.<br> Хранение в подземном паркинге!<br><br> По всем интересующим вопросам звоните-с удовольствием отвечу!<br> Переоформление в мреэ',
        images: [
            'https://images.unsplash.com/photo-1582467029543-8d5b719a1236?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            'https://images.unsplash.com/photo-1558787503-311fdac114af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80',
        ],
        price: 1500,
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 111,
        title: 'Hyundai sonata 2017 LPI',
        description:
            'Продам свою машину в отличном состоянии! Машина пригнана из Кореи, заводской газ! В феврале сделано ТО.  Коробка не пинает, переключает передачи четко! Двигатель работает ровно. В ДТП не была, в родной краске везде.  Остался видео обзор с аукциона, который делали перед покупкой, машина ровно в том же состоянии.  Пробег 179000 км, чистый 2017 год, заводской газ, салон, карты дверей, багажник, подкапотное пространство, всё в отличном состоянии!  Кожаный руль; кожаный салон,безключевой доступ; подогревы руля, передних сидений, кнопка старт/стоп заводская, круиз контроль.  Передний и задний видеорегистратор и третий родной лежит, полноценная запаска.  Это действительно комфортный автомобиль во всём, есть с чем сравнить! Просто огромный салон, удобные сиденья.  Из минусов, есть маленькие, не глубокие сколы и царапины внизу кузова и небольшая дента на задней правой двери.  На фото все дефекты видны. Перекупам, просьба не беспокоить, мне не горит и цену своей машине я знаю!  Машиной будете реально довольны!!! Есть вопросы- звони, пиши, скину доп фото/видео. ',
        images: [
            'https://images.unsplash.com/photo-1633359064754-804ba55e733f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 2200,
        sale: {
            percentage: 10,
            description: 'Получите 10% скидки до 30.09.2022',
        },
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
    {
        id: 112,
        title: 'Bmw x6 2017 Официальный',
        description:
            'Продам BMW X6 2017 год. 3.0 бензин. <br> Куплена у Официального дилера в Киеве на АВТ!<br> По комплектации: <br> Хорошие сиденья с регулировками.<br> Полностью все в коже,торпеда карты дверей . <br> Автоматически дальний свет<br> Подсветка по салону. <br> Подогрев сидений <br> Подогрев руля<br> Проекция <br> Лед приборка <br> Полный Заводской М-пакет<br> Камера заднего вида <br> Парктроники <br> Датчики слепых зон <br> Датчик дождя <br> Датчик света <br> Круиз <br>И многое другое …<br><br> По машине все идеально, делать ничего не нужно, обслуживание и все ТО у официального дилера. Других СТО машина никогда! <br> На машине поменяны все жидкости по регламенту. Последнее ТО было 1000 км назад. <br> Машина никаких вложений не требует! <br> Вся передняя часть авто в пленке, зоны под ручками торцы дверей,зеркала,стойки все в полеуретановой пленке. <br> Машина покрыта керамикой. <br> По салону вся кожа все было обработано составом для кожи! <br> В комплекте 2 комплекта оригинальных дисков с резиной. Зимний комплект покупали у официального дилера за 5000$! На авто установлено дорогая сигнализация Бениш !',
        images: [
            'https://images.unsplash.com/photo-1550966286-463de289b622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
        ],
        price: 4000,
        category: { slug: 'transport', title: 'Transport' },
        status: 'done',
        reviews: 10,
    },
];
