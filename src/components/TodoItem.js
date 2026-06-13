import React, { Component } from 'react';

export default class TodoItem extends Component {
  renderRows(items, depth = 0) {
    if (!items || !items.length) return null;

    return items.filter(Boolean).map((item) => (
      <React.Fragment key={item.id}>
        <tr className={depth > 0 ? 'todo-subtask-row' : ''}>
          <td
            className='text-info todo-task-cell'
            style={{ paddingLeft: `${depth * 1.25 + 0.75}rem` }}
          >
            {depth > 0 && <span className='text-muted mr-1'>↳</span>}
            {item.title}
          </td>
          <td className='text-center todo-action-cell'>
            <button
              type='button'
              className='btn btn-link btn-sm p-0 text-warning'
              onClick={() => this.props.handleEdit(item.id)}
              aria-label='Edit task'
            >
              <i className='fas fa-pen'></i>
            </button>
          </td>
          <td className='text-center todo-action-cell'>
            <button
              type='button'
              className='btn btn-link btn-sm p-0 text-danger'
              onClick={() => this.props.handleDelete(item.id)}
              aria-label='Delete task'
            >
              <i className='fas fa-trash'></i>
            </button>
          </td>
          <td className='text-center todo-action-cell'>
            <button
              type='button'
              className='btn btn-link btn-sm p-0 text-success'
              onClick={() => this.props.handleAddSubtask(item.id, items)}
              aria-label='Add subtask'
            >
              <i className='fas fa-plus'></i>
            </button>
          </td>
        </tr>
        {item.subtasks && item.subtasks.length
          ? this.renderRows(item.subtasks, depth + 1)
          : null}
      </React.Fragment>
    ));
  }

  render() {
    const { items } = this.props;
    if (!items || !items.length) return null;
    return <React.Fragment>{this.renderRows(items)}</React.Fragment>;
  }
}
