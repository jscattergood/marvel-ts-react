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

interface IListContainerProps {
  characters: ICharacterProps[]
}

class MarvelListContainer extends React.Component<IListContainerProps, {}> {
  public render() {
    return (
      <ul className="characters-list-container">
        {
          this.props.characters.map(
            character => <MarvelCharacterItem
              key={character.name}
              {...character}/>
          )
        }
      </ul>
    )
  }
}

interface ICharacterProps {
  name: string,
  power: string
}

class MarvelCharacterItem extends React.Component<ICharacterProps, {}> {
  public render() {
    return (
      <li className="character-item">
        <h2 className="character-name">
          {this.props.name}
        </h2>
        <p className="character-power">
          {this.props.power}
        </p>
      </li>
    )
  }
}

const fakeCharacterResults = [
  {
    name: "Spiderman",
    power: "Web Slinging"
  },
  {
    name: "Hulk",
    power: "Strength"
  },
  {
    name: "Thor",
    power: "Lightning"
  }
];

class Page extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="characters-page">
        <MarvelHeader/>
        <MarvelListContainer characters={fakeCharacterResults}/>
      </div>
    )
  }
}

export default Page;
