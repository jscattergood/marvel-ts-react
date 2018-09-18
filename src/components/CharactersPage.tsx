import * as React from 'react';
import {SyntheticEvent} from "react";
import {RouteComponentProps} from "react-router";
import {dispatch, store} from '../store/store';
import {ActionTypes, IAppState, ICharacter} from '../store/types';
import './App.css';

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

interface IContainerProps extends IAppState, RouteComponentProps<any> {
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
                               {...props}
                               {...character}/>
        )
      }
    </ul>
  )
};

interface ICharacterItemProps extends ICharacter, RouteComponentProps<any> {
  dispatch: ({}) => void
  selectedCharacterId: number
}

class MarvelCharacterItem extends React.PureComponent<ICharacterItemProps, {}> {
  constructor(props: ICharacterItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDetailClick = this.handleDetailClick.bind(this);
  }

  public handleClick() {
    this.props.dispatch({type: ActionTypes.SELECT_CHARACTER, payload: this.props.id})
  }

  public handleDetailClick(event: SyntheticEvent) {
    event.preventDefault();
    this.props.history.push(`/${this.props.selectedCharacterId}`)
  }


  public render() {
    const className = `character-item ${this.selected() ? 'selected' : ''}`;
    return (
      <li onClick={this.handleClick} className={className}>
        <h2 className="character-name">
          {this.props.name}
        </h2>
        {this.selected() ?
          <div className="character-item">
            <img className="character-item-image"
                    src={`${this.props.thumbnail.path}.${this.props.thumbnail.extension}`}/>
            <button className="character-item-detail-button">Details</button>
            <form onSubmit={this.handleDetailClick}>
              <button type="submit">Details</button>
            </form>
          </div>
          : null}
      </li>
    )
  }

  private selected() {
    return this.props.selectedCharacterId === this.props.id;
  }
}

class CharactersPage extends React.PureComponent<RouteComponentProps<any>, IAppState> {
  private unsubscribe: () => void;

  constructor(props: RouteComponentProps<any>) {
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
        dispatch({type: ActionTypes.CHARACTERS_LOADED, payload: resp})
      });

    dispatch({type: ActionTypes.CHARACTERS_LOADING});
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    const containerProps = {
      ...this.state,
      ...this.props,
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

export default CharactersPage;
