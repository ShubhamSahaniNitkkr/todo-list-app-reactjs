import React, { Component } from 'react';
import TodoList from './TodoList';

export default class TodoInput extends Component {
  render() {
    const {
      item,
      items,
      handleChange,
      handleSubmit,
      editItem,
      clearList,
      handleDelete,
      handleEdit,
    } = this.props;
    return (
      <div className='card mx-auto col-md-6 shadow p-3 mb-5 bg-white rounded'>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-row'>
              <div className='col-md-9'>
                <label className='sr-only'>Add Task </label>
                <div className='input-group mb-2'>
                  <input
                    type='text'
                    autoFocus
                    className='form-control'
                    id='inlineFormInputGroup'
                    placeholder='Add Your Task Here ...'
                    value={item}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='col-md-3'>
                <button
                  type='submit'
                  className={
                    editItem ? 'btn btn-warning mb-2' : 'btn btn-success mb-2'
                  }
                >
                  {editItem ? (
                    <i className='fas fa-pen'></i>
                  ) : (
                    <i className='fas fa-thumbtack'></i>
                  )}
                  {editItem ? '  Edit' : '  Add'}Task
                </button>
              </div>
            </div>
          </form>
          <TodoList
            items={items}
            clearList={clearList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    );
  }
}
