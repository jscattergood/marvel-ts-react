export enum ActionTypes {
  SELECT_CHARACTER,
  CHARACTERS_LOADED
}

export interface IAppState {
  characters: ICharacter[],
  selectedCharacterId: number,
}

export interface ICharacter {
  id: number
  name: string
  thumbnail: {
    path: string,
    extension: string
  }
}
