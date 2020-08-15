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
    addSubtask: false,
    parentItem: '',
    parentId: '',
    totalWidth: 4,
  };

  componentDidMount() {
    let items = window.localStorage.getItem('todo-items');
    if (items !== null) {
      this.setState({
        items: JSON.parse(items),
      });
    }
  }

  findObjUtil = (itemsArr, Id) => {
    let res = {};
    for (let item of itemsArr) {
      if (item.id === Id) {
        this.setState({
          item: item,
        });
        break;
      }
      if (item.subtasks.length) this.findObjUtil(item.subtasks, Id);
    }
    return res;
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  handleAddSubtask = (id, itemArr) => {
    const selectedItems = itemArr.find((item) => item.id === id);

    this.setState({
      addSubtask: true,
      parentItem: selectedItems.title,
      parentId: id,
    });
  };

  updateObjUtil = (itemArr, parentId) => {
    itemArr.map((item) => {
      if (item.id === parentId) {
        item.subtasks = [
          ...item.subtasks,
          {
            id: uuid(),
            title: this.state.item,
            subtasks: [],
          },
        ];
      }
      if (item.subtasks.length) this.updateObjUtil(item.subtasks, parentId);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.item === '') return false;
    let newItem = {},
      updatedItem,
      width = this.state.totalWidth;

    if (this.state.addSubtask) {
      this.updateObjUtil(this.state.items, this.state.parentId);

      updatedItem = [...this.state.items];
    } else {
      newItem = {
        id: this.state.id,
        title: this.state.item,
        subtasks: [],
      };
      updatedItem = [...this.state.items, newItem];
    }

    localStorage.setItem('todo-items', JSON.stringify(updatedItem));

    this.setState({
      items: updatedItem,
      item: '',
      id: uuid(),
      editItem: false,
      totalWidth: this.state.addSubtask ? width + 1 : width,
      addSubtask: false,
      parentItem: '',
      parentId: '',
    });
  };

  clearList = () => {
    this.setState({
      items: [],
      id: uuid(),
      item: '',
      editItem: false,
      addSubtask: false,
      parentItem: '',
      parentId: '',
    });
    localStorage.setItem('todo-items', JSON.stringify([]));
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

  setTotalWidth = (width) => {
    this.setState({
      totalWidth: width,
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
          parentItem={this.state.parentItem}
          addSubtask={this.state.addSubtask}
          totalWidth={this.state.totalWidth}
          setTotalWidth={this.setTotalWidth}
        />
      </div>
    );
  }
}

export default App;
