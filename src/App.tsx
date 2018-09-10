import * as React from 'react';
import './App.css';

class MarvelHeader extends React.Component<{}, {}> {
  public render() {
    return (
      <header>
        <h1>Marvel Characters</h1>
        <img src=""/>
      </header>
    )
  }
}

class MarvelListContainer extends React.Component<IAppState, {}> {
  public render() {
    return (
      <ul className="characters-list-container">
        {
          this.props.characters.map(character =>
            <MarvelCharacterItem key={character.id} {...character}/>
          )
        }
      </ul>
    )
  }
}

class MarvelCharacterItem extends React.Component<ICharacter, {}> {
  public render() {
    return (
      <li className="character-item">
        <h2 className="character-name">
          {this.props.name}
        </h2>
      </li>
    )
  }
}

interface ICharacter {
  id: string
  name: string
  thumbnail: {
    path: string,
    extension: string
  }
}

interface IAppState {
  characters: ICharacter[]
}

class Page extends React.Component<{}, IAppState> {
  public readonly state: IAppState;

  constructor(props: IAppState) {
    super(props);
    this.state = {characters: []};
  }

  public componentDidMount() {
    fetch('http://f8852929.ngrok.io/api/characters')
      .then(resp => resp.json())
      .then(resp => resp.data.results)
      .then(resp => {
        this.setState({characters: resp})
      });
  }

  public render() {
    return (
      <div className="characters-page">
        <MarvelHeader/>
        <MarvelListContainer characters={this.state.characters}/>
      </div>
    )
  }
}

export default Page;
