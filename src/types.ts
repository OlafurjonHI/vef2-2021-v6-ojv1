// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  person: null;
  id: string;
  name?: string;
  birthYear?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  mass?: number;
  // TODO fleiri týpur
}

export interface IPeopleResponse {
  id: string;
  name?: string;
  // TODO fleiri týpur
}

export interface IAllFilms {
  allFilms: any;
  films: Array<IFilm>;

}

export interface IFilm {
  characterConnection: { characters: Array<ICharacter>; };
  episodeID: number;
  title?: string;
  openingCrawl?: string;
  characters?: Array<ICharacter>;
}

export interface IPaging {
  id: string;
  name?: string;
  // TODO fleiri týpur
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti
