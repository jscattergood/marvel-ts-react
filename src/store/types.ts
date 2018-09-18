export enum ActionTypes {
  SELECT_CHARACTER,
  CHARACTERS_LOADED,
  CHARACTERS_LOADING,
  CHARACTER_DETAIL_LOADED,
  CHARACTER_DETAIL_LOADING
}

export interface IAppState {
  charactersLoading: boolean
  characters: ICharacter[]
  selectedCharacterId: number
}

export interface ICharacter {
  id: number
  name: string
  thumbnail: {
    path: string,
    extension: string
  }
}
