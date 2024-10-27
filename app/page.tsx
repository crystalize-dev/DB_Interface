import Link from 'next/link';
import { DBLinks } from './links/links';
import Icon from './components/Icon/Icon';

export default function Home() {
    return (
        <div className="flex h-full w-full flex-wrap gap-4">
            {DBLinks.map((obj) => (
                <Link
                    href={`/${obj.link}`}
                    key={obj.link}
                    className={`flex h-fit flex-col items-center gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-8`}
                >
                    <Icon icon={obj.icon} className="!size-8 text-zinc-400" />
                    <h1 className="text-2xl capitalize">{obj.label}</h1>
                    <p className="text-sm text-zinc-400">{obj.description}</p>
                </Link>
            ))}
        </div>
    );
}
