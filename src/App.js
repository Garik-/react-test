import React, { Component } from 'react';
import styled from 'styled-components'

import './App.css';


const itemStorage = {
  data: [],
  listeners: [],
  add: function(text) {

    const item = {
      text: text
    };

    this.data.push(item);
    this.createEvent('add');
  },

  get: function() {
    return this.data;
  },

  delete: function(index) {
    this.data.splice(index,1);
    this.createEvent('delete');
  },

  addEventListener: function(callback) {
    this.listeners.push(callback);
  },

  createEvent(event) {
    this.listeners.forEach((listener) => { listener(event) });
  }
};

itemStorage.add('item1');
itemStorage.add('item2');

class TodoForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    itemStorage.add(this.state.text);
    event.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" name="text" onChange={this.handleInputChange}/>
        </label>
      <input type="submit" value="Submit" />
    </form>
    )
  }
}

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {items:[]};

    this.updateItems = this.updateItems.bind(this);

    itemStorage.addEventListener(this.updateItems);
  }

  updateItems() {
    this.setState({items: itemStorage.get()});
  }

  componentDidMount() {
    this.updateItems();
  }

  render() {
    return (
      <div><TodoList items={this.state.items}/><TodoForm/></div>)
  }
}

const DeleteButton = styled.button`
transition-timing-function: ease;
transition-duration: 200ms;
display: inline-block;
font-size: 13px;
letter-spacing: 1px;
text-transform: uppercase;
color: #fff;
background-color: #7AE2DE;
padding: 20px;
text-decoration: none;
line-height: 1;
margin-bottom: 0;
font-weight: 400;
text-align: center;
white-space: nowrap;
vertical-align: middle;
-ms-touch-action: manipulation;
    touch-action: manipulation;
cursor: pointer;
-webkit-user-select: none;
   -moz-user-select: none;
    -ms-user-select: none;
        user-select: none;
background-image: none;
border: 1px solid transparent;
`;

class TodoItemDelete extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    itemStorage.delete(this.props.index);
  }

  render() {
    return (
      <DeleteButton onClick={this.handleClick}>delete</DeleteButton>
    )
  }
}

class TodoList extends React.Component {

  render() {
    const items = this.props.items.map((item, index) => <li key={index}>{item.text} <TodoItemDelete index={index}/></li>)
    return (
      <ul>{items}</ul>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Todo />
    );
  }
}

export default App;