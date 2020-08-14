import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const { items, handleDelete, handleEdit, handleAddSubtask } = this.props;

    return (
      <tr>
        {items.length
          ? items.map((item, idx) => (
              <React.Fragment key={idx}>
                <td className='text-info'>{item.title ? item.title : null}</td>
                <td>
                  <i
                    className='fas fa-pen text-warning'
                    onClick={() => handleEdit(item.id)}
                  ></i>
                </td>
                <td>
                  <i
                    className='fas fa-trash text-danger'
                    onClick={() => handleDelete(item.id)}
                  ></i>
                </td>
                <td>
                  <i
                    className='fas fa-plus text-success'
                    onClick={() => handleAddSubtask(item.id)}
                  ></i>
                </td>
                {Object.keys(item.subtasks).length ? (
                  <TodoItem
                    items={item.subtasks}
                    handleDelete={() => handleDelete}
                    handleEdit={() => handleEdit}
                    handleAddSubtask={() => handleAddSubtask}
                  />
                ) : null}
              </React.Fragment>
            ))
          : null}
      </tr>
    );
  }
}
