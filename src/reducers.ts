import {ActionTypes, ICharacter} from "./types";

const initialState = {
  characters: [],
  selectedCharacterId: -1,
};

export const selectedCharacterId = (state=initialState.selectedCharacterId, action:any):number => {
  switch (action.type) {
    case ActionTypes.SELECT_CHARACTER:
      return action.payload;
    default:
      return state;
  }
};

export const characters = (state=initialState.characters, action:any):ICharacter[] => {
  switch (action.type) {
    case ActionTypes.CHARACTERS_LOADED:
      return action.payload;
    default:
      return state;
  }
};
