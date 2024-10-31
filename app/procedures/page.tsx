import Link from 'next/link';
import React from 'react';
import { procedures } from '../data/procedures';

const ProceduresPage = () => {
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-dark-bg">Процедуры</h1>
            </div>

            <div className="mt-4 flex w-full grow flex-col gap-4">
                {procedures.map((proc) => (
                    <Link
                        key={proc.link}
                        href={`/procedures/${proc.link}`}
                        className={`flex h-fit w-fit flex-col items-center gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-8`}
                    >
                        {proc.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProceduresPage;
