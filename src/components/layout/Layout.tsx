import Link from 'next/link';

import s from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props): JSX.Element {
  return (
    <div className={s.layout}>
      <Link href="/">Films</Link>
      <Link href="/characters">Characters</Link>
      <main>{children}</main>
    </div>
  );
}
