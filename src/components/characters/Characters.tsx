/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import fetch from 'node-fetch';
import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter } from '../../types';

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
// type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<string | null>(null);
  let startCursor: React.SetStateAction<string | null>;
  const apiUrl = `api/characters?after=${nextPage}`;
  const fetchMore = async (): Promise<void> => {
    setLoading(true);
    let json;
    if (!hasNextPage) setNextPage(startCursor);

    try {
      const result = await fetch(apiUrl);
      if (!result.ok) {
        throw new Error('result not ok');
      }
      json = await result.json();
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
    setCharacters(json.allPeople.people);
    if (!startCursor) startCursor = json.allPeople.pageInfo.startCursor;
    setNextPage(json.allPeople.pageInfo.endCursor);
    if (hasNextPage) setHasNextPage(json.allPeople.pageInfo.endCursor.hasNextPage);
    // TODO sækja gögn frá /pages/api/characters.ts (gegnum /api/characters), ef það eru fleiri
    // (sjá pageInfo.hasNextPage) með cursor úr pageInfo.endCursor
  };
  useEffect(() => {
    fetchMore();
  }, []);
  if (loading) {
    return <p>Fetching Data...</p>;
  }
  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <Button disabled={loading} onClick={fetchMore}>
        {(nextPage === null) ? 'Start over' : 'Fetch More'}
      </Button>
    </section>
  );
}
