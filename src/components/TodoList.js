import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  renderBody = (items) => {
    console.log(items, 'ite');
    let AllItems = items.map((item, idx) => {
      return (
        <React.Fragment>
          <TodoItem
            key={`${item.id}-${idx}`}
            title={item.title}
            handleDelete={() => this.props.handleDelete(item.id)}
            handleEdit={() => this.props.handleEdit(item.id)}
            handleAddSubtask={() => this.props.handleAddSubtask(item.id)}
          />
        </React.Fragment>
      );
    });
    return AllItems;
  };

  render() {
    const { items, clearList } = this.props;

    return (
      <React.Fragment>
        <table className='table table-bordered col-md-12 mx-auto table-striped table-hover mt-5'>
          <thead>
            <tr>
              <th
                colSpan='4'
                className='h2 text-center alert alert-success'
                role='alert'
              >
                <i className='fas fa-clipboard-list'></i> To Do List
              </th>
            </tr>
            <tr>
              <th scope='col'>Task</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Remove</th>
              <th scope='col'>Add subtask</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody(items)}

            {items.length !== 0 && (
              <tr>
                <td colSpan='4' className='text-right'>
                  <button
                    type='button'
                    onClick={clearList}
                    disabled={items.length === 0 ? true : false}
                    className='btn btn-danger text-capitalize'
                  >
                    <i className='fas fa-sync-alt'></i> Clear list{' '}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
