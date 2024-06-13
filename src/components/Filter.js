import React from "react";

const Filter = ({ setFilterType }) => {
  const handleChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="username">Username</option>
      <option value="email">Email</option>
    </select>
  );
};

export default Filter;
