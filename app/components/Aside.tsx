import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Icon from './Icon/Icon';
import logo from '../img/logo.png';
import Image from 'next/image';
import { DBLinks } from '../data/links';

const Aside = () => {
    const path = usePathname();

    return (
        <div className="scrollable flex h-full w-72 flex-col gap-4 bg-gradient-to-b from-dark-bg to-dark-object p-8 text-white">
            <Link href={'/'} className="flex items-center gap-2">
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
            </Link>

            <div className="mt-4 flex w-full grow flex-col gap-4">
                {DBLinks.map((obj) => (
                    <Link
                        href={`/${obj.link}`}
                        key={obj.link}
                        className={`flex w-full items-center gap-2 rounded-md px-5 py-3 text-lg font-semibold capitalize outline outline-1 outline-transparent transition-all ${path.includes(`/${obj.link}`) ? 'bg-primary' : 'hover:outline-primary'}`}
                    >
                        <Icon icon={obj.icon} />
                        <p>{obj.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Aside;
