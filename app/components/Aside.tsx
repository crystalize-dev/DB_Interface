import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Icon from './Icon/Icon';
import { IconType } from './Icon/icon-database';
import logo from '../img/logo.png';
import Image from 'next/image';

const Aside = () => {
    type LinkType = {
        icon: IconType;
        link: string;
    };

    const DBLinks: LinkType[] = [
        { icon: 'shoppingCart', link: 'products' },
        { icon: 'group', link: 'employees' },
        { icon: 'calendar', link: 'orders' }
    ];
    const path = usePathname();

    return (
        <div className="from-dark-bg to-dark-object scrollable flex h-full w-72 flex-col gap-4 bg-gradient-to-b p-8 text-white">
            <div className="flex items-center gap-2">
                <div className="relative size-12">
                    <Image
                        alt="logo"
                        src={logo}
                        width={500}
                        height={500}
                        priority
                        className="h-full w-full"
                    />
                </div>
                <h1 className="text-2xl font-bold">MobileLite</h1>
            </div>

            <div className="mt-4 flex w-full grow flex-col gap-4">
                {DBLinks.map((obj) => (
                    <Link
                        href={`/${obj.link}`}
                        key={obj.link}
                        className={`flex w-full items-center gap-2 rounded-md px-5 py-3 text-lg font-semibold capitalize outline outline-1 outline-transparent transition-all ${path === `/${obj.link}` ? 'bg-primary' : 'hover:outline-primary'}`}
                    >
                        <Icon icon={obj.icon} />
                        <p>{obj.link}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Aside;
