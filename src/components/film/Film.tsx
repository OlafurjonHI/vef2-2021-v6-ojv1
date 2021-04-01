import Link from 'next/link';
import { ICharacter, IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film: IFilm;
};

export function Film({ film }: Props): JSX.Element {
  const { characters } = film.characterConnection;
  return (
    <section className={s.film}>
      
      <h2 className={s.film__title}>
        {`Episode ${film.episodeID}: ${film.title}`}
      </h2>
      <div className={s.film__summary}>
        <pre>
          {film.openingCrawl}
        </pre>
        <div className={s.film__characters}>
        <h3>Characters</h3>
        <ul className={s.film__characterList}>
          { characters.map((c:ICharacter) => (
            <li className={s.film__characterListItem} key={c.id}>
              <Link href={`/characters/${c.id}`}>{c.name}</Link>
            </li>
          )) }
        </ul>
      </div>
      </div>
      
    </section>
  );
}
