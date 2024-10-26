import Link from 'next/link';
import React from 'react';

const Aside = () => {
    const DBLinks = ['products', 'employees', 'orders'];

    return (
        <div className="flex h-full w-80 flex-col items-center gap-4 bg-primary p-4 text-white">
            <h1 className="text-2xl font-bold">Информация из БД:</h1>

            <hr className="w-[90%]" />

            <div className="mt-4 flex w-full grow flex-col gap-4">
                {DBLinks.map((link) => (
                    <Link
                        href={`/${link}`}
                        key={link}
                        className="w-full rounded-md border border-solid border-white/20 p-4 text-lg font-semibold capitalize transition-all hover:bg-white/20"
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Aside;
