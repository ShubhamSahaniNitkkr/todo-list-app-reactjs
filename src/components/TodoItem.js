import React, { Component } from 'react';

export default class TodoItem extends Component{
  render(){
    const {title,handleDelete,handleEdit} = this.props;

    return(
    <tr>
      <td className="text-info">{title}</td>
      <td><i className="fas fa-pen text-warning" onClick={handleEdit}></i></td>
      <td><i className="fas fa-trash text-danger" onClick={handleDelete}></i></td>
    </tr>
    )
  }
}
