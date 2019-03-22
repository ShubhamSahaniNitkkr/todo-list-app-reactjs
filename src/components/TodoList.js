import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component{
  render(){
    const {items,clearList,handleDelete,handleEdit} = this.props;
    return(
      <React.Fragment>

<table className="table table-bordered col-md-8 mx-auto table-striped table-hover">
  <thead>
    <tr>
      <th colSpan="3" className="h2 text-center alert alert-success" role="alert"><i className="fas fa-clipboard-list"></i> To Do List</th>
    </tr>
    <tr>
      <th scope="col">Work</th>
      <th scope="col">Update</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>
    {items.map(item => {
        return <TodoItem
          key={item.id}
          title={item.title}
          handleDelete={()=>handleDelete(item.id)}
          handleEdit={()=>handleEdit(item.id)}
          />
      })
    }
    {
      items.length ===0 ?'':
    <tr>
      <td colSpan="3" className="text-right">

        <button type="button" onClick={clearList} disabled={items.length ===0 ? true : false} className="btn btn-danger text-capitalize"> <i className="fas fa-sync-alt"></i> Clear list </button>
      </td>
    </tr>
   }

  </tbody>
</table>

      </React.Fragment>
    )
  }
}
