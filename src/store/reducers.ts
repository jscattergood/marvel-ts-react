import {AnyAction} from "redux";
import {ActionTypes, ICharacter} from "./types";

const initialState = {
  characters: [],
  charactersLoading: false,
  selectedCharacterId: -1,
};

export const selectedCharacterId = (state=initialState.selectedCharacterId, action: AnyAction):number => {
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

export const charactersLoading = (state=initialState.charactersLoading, action: AnyAction): boolean => {
  switch (action.type) {
    case ActionTypes.CHARACTERS_LOADING:
      return true;
    case ActionTypes.CHARACTERS_LOADED:
      return false;
    default:
      return state;
  }
};
