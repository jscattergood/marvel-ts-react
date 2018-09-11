import * as React from 'react';
import './App.css';
import {dispatch, store} from './store';
import {ActionTypes, IAppState, ICharacter} from './types';

class MarvelHeader extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <header>
        <h1>Marvel Characters</h1>
        <img src=""/>
      </header>
    )
  }
}

interface IContainerProps extends IAppState {
  dispatch: () => void
}

const MarvelListContainer = (props: IContainerProps) => {
  const spinnerClass = props.charactersLoading ? "characters-loading" : "characters-loading hidden";
  return (
    <ul className="characters-list-container">
      <img className={spinnerClass} src="images/spinner.gif"/>
      {
        props.characters.map(character =>
          <MarvelCharacterItem key={character.id}
                               dispatch={props.dispatch}
                               selectedCharacterId={props.selectedCharacterId}
                               {...character}/>
        )
      }
    </ul>
  )
};

interface ICharacterItemProps extends ICharacter {
  dispatch: ({}) => void
  selectedCharacterId: number
}

class MarvelCharacterItem extends React.PureComponent<ICharacterItemProps, {}> {
  constructor(props: ICharacterItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    this.props.dispatch({type: ActionTypes.SELECT_CHARACTER, payload: this.props.id})
  }

  public render() {
    const className = `character-item ${this.selected() ? 'selected' : ''}`;
    return (
      <li onClick={this.handleClick} className={className}>
        <h2 className="character-name">
          {this.props.name}
        </h2>
        {this.selected() ?
          <img className='character-item'
               src={`${this.props.thumbnail.path}.${this.props.thumbnail.extension}`}/> : null}
      </li>
    )
  }

  private selected() {
    return this.props.selectedCharacterId === this.props.id;
  }
}

class Page extends React.PureComponent<{}, IAppState> {
  private unsubscribe: () => void;

  constructor(props: IAppState) {
    super(props);
    this.state = store.getState();
  }

  public componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

    fetch('http://7cb45804.ngrok.io/api/characters')
      .then(resp => resp.json())
      .then(resp => resp.data.results)
      .then(resp => {
        store.dispatch({type: ActionTypes.CHARACTERS_LOADED, payload: resp})
      });

    store.dispatch({type: ActionTypes.CHARACTERS_LOADING});
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    const containerProps = {
      ...this.state,
      dispatch
    };

    return (
      <div className="characters-page">
        <MarvelHeader/>
        <MarvelListContainer {...containerProps}/>
      </div>
    )
  }
}

export default Page;
