import React, { Component } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: '',
    editItem: false,
  };

  componentDidMount() {
    let items = window.localStorage.getItem('todo-items');
    if (items !== null) {
      this.setState({
        items: JSON.parse(items),
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item,
      subtasks: [],
    };

    let updatedItem = [...this.state.items, newItem];

    localStorage.setItem('todo-items', JSON.stringify(updatedItem));

    this.setState({
      items: updatedItem,
      item: '',
      id: uuid(),
      editItem: false,
    });
  };

  clearList = () => {
    this.setState({
      items: [],
    });
  };

  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });
    localStorage.setItem('todo-items', JSON.stringify(filteredItems));
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItems = this.state.items.find((item) => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItems.title,
      editItem: true,
      id: id,
    });
  };

  handleAddSubtask = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItems = this.state.items.find((item) => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItems.title,
      editItem: true,
      id: id,
    });
  };

  render() {
    return (
      <div className='container py-5'>
        <TodoInput
          item={this.state.item}
          items={this.state.items}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          editItem={this.state.editItem}
          clearList={this.clearList}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleAddSubtask={this.handleAddSubtask}
        />
      </div>
    );
  }
}

export default App;
