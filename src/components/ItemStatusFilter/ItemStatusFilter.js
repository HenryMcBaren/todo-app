import React, { Component } from "react";
import "./ItemStatusFilter.css";

class ItemStatusFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const btnClassName = isActive
        ? "btn btn-info"
        : "btn btn-outline-secondary";
      return (
        <button
          key={name}
          onClick={() => {
            onFilterChange(name);
          }}
          type="button"
          className={btnClassName}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}

export default ItemStatusFilter;
