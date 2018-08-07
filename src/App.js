import React, { Component } from 'react';
import './App.css';


const itemStorage = {
  data: [],
  listeners: [],
  add: function(text) {

    let item = {
      text: text
    };

    this.data.push(item);

    this.listeners.map((listener) => { listener('add') });
  },

  get: function() {
    return this.data;
  },

  addEventListener: function(callback) {
    this.listeners.push(callback);
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

class TodoList extends React.Component {

  render() {
    const items = this.props.items.map((item, index) => <li key={index}>{item.text}</li>)
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