import * as React from 'react';
import {dispatch, store} from '../store/store';
import {ActionTypes, IAppState} from '../store/types';
import './App.css';

class CharacterDetailPage extends React.PureComponent<{}, IAppState> {
  private unsubscribe: () => void;

  constructor(props: IAppState) {
    super(props);
    this.state = store.getState();
  }

  public componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    fetch(`http://7cb45804.ngrok.io/api/character/${this.state.selectedCharacterId}`)
      .then(resp => resp.json())
      .then(resp => resp.data.results)
      .then(resp => {
        dispatch({type: ActionTypes.CHARACTER_DETAIL_LOADED, payload: resp})
      });

    dispatch({type: ActionTypes.CHARACTER_DETAIL_LOADING});
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    // const containerProps = {
    //   ...this.state,
    //   dispatch
    // };

    return (
      <div className="characters-detail-page">
        Character
      </div>
    )
  }}

export default CharacterDetailPage;
