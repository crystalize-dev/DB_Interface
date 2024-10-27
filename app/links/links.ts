import { IconType } from '../components/Icon/icon-database';

type LinkType = {
    icon: IconType;
    link: string;
    label: string;
    description?: string;
};

export const DBLinks: LinkType[] = [
    {
        icon: 'shoppingCart',
        link: 'products',
        label: 'Товары',
        description: 'Список всех товаров на продажу'
    },
    {
        icon: 'group',
        link: 'employees',
        label: 'Сотрудники',
        description: 'Список всех сотрудников компании'
    },
    {
        icon: 'shop',
        link: 'orders',
        label: 'Заказы',
        description: 'Список всех заказов'
    },
    {
        icon: 'user-pair',
        link: 'customers',
        label: 'Клиенты',
        description: 'Список всех клиентов компании'
    }
];
