import React, { Component } from 'react';
import TodoList from './TodoList';

export default class TodoInput extends Component {
  render() {
    const { item, handleChange, handleSubmit, editItem } = this.props;
    return (
      <div className='card mx-auto col-md-8 shadow p-3 mb-5 bg-white rounded'>
        <h2 className='card-title text-center alert alert-primary' role='alert'>
          <i className='fas fa-edit '></i> To Do App
        </h2>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-row'>
              <div className='col-md-9'>
                <label className='sr-only'>Add Task </label>
                <div className='input-group mb-2'>
                  <input
                    type='text'
                    className='form-control'
                    id='inlineFormInputGroup'
                    placeholder='Write Your Task Here ...'
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
                  <i className='fas fa-thumbtack'></i>{' '}
                  {editItem ? 'Edit ' : 'Add '}Task
                </button>
              </div>
            </div>
          </form>

          <TodoList
            items={this.props.items}
            clearList={this.props.clearList}
            handleDelete={this.props.handleDelete}
            handleEdit={this.props.handleEdit}
          />
        </div>
      </div>
    );
  }
}
