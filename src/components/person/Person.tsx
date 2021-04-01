import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <ul className={s.person__list}>
        <li><strong>Birth year</strong></li>
        <li>{person.birthYear}</li>
        <li><strong>Eye color</strong></li>
        <li>{person.eyeColor}</li>
        <li><strong>Hair color</strong></li>
        <li>{person.hairColor}</li>
        <li><strong>Height</strong></li>
        <li>{person.height} cm</li>
        <li><strong>Mass</strong></li>
        <li>{person.mass} kg</li>
      </ul>
      <Link href="/characters">Back to characters</Link>
    </div>
  );
}
