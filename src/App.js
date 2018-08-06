import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import Router from './Router'



import './App.css';

const items = [
      {
        'id': 1,
        'name': 'Home',
        'href': '/'
      },
      {
        'id': 2,
        'name': 'About Us',
        'href': '/about'
      },
      {
        'id':3,
        'name': 'Contact Us',
        'href': '/contacts'
      }
    ];

const Header = () => (
  <header>
    <ul className="navigation">
      {items.map(item => 
        <li key={item.id} className="navigation__item">
          <Link className="navigation__item--link" to={item.href}>{ item.name }</Link>
        </li>)}
    </ul>
  </header>
      )


const About = () => (
  <div>About</div>
)


const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)

/*const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
    </Switch>
  </main>
)*/





class App extends Component {
  render() {
    return ( 
      <div><Header/><Router/></div>
    );
  }
}

export default App;