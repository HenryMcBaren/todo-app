import React, { Component } from "react";
import TodoList from "../TodoList";
import SearchPanel from "../SearchPanel";
import AppHeader from "../AppHeader";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";
import "./App.css";

class App extends Component {
  maxId = 0;
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Do thing"),
      this.createTodoItem("Make thing")
    ],
    term: "",
    filter: "all" //all, active, done
  };
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr
      };
    });
  };
  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };
  addItem = text => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  };
  createTodoItem(label) {
    return {
      id: this.maxId++,
      label,
      important: false,
      done: false
    };
  }
  search(items, filter) {
    if (filter === "") {
      return items;
    }

    return items.filter(el => {
      return el.label.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  }
  onSearchChange = term => {
    this.setState({ term });
  };
  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }
  onFilterChange = filter => {
    this.setState({ filter });
  };
  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader done={doneCount} toDo={todoCount} />
        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

export default App;
