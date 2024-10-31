import { IconType } from '../components/Icon/icon-database';

type LinkType = {
    icon: IconType;
    link: string;
    label: string;
    description?: string;
};

export const DBLinks: LinkType[] = [
    {
        icon: 'shop',
        link: 'orders',
        label: 'Заказы',
        description: 'Список всех заказов'
    },
    {
        icon: 'shoppingCart',
        link: 'products',
        label: 'Товары',
        description: 'Список всех товаров на продажу'
    },
    {
        icon: 'user-pair',
        link: 'employees',
        label: 'Сотрудники',
        description: 'Список всех сотрудников компании'
    },
    {
        icon: 'group',
        link: 'customers',
        label: 'Клиенты',
        description: 'Список всех клиентов компании'
    },
    {
        icon: 'tag',
        link: 'procedures',
        label: 'Процедуры',
        description: 'Вызов хранимых процедур БД'
    }
];
