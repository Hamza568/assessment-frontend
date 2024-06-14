import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

const SearchBar = ({ setSearchType, searchType, handleSearch }) => (
  <>
    <Select
      defaultValue="name"
      style={{ marginLeft: 10, width: 120 }}
      onChange={(value) => setSearchType(value)}
    >
      <Option value="name">Name</Option>
      <Option value="email">Email</Option>
    </Select>
    <Input.Search
      placeholder={`Search by ${searchType}`}
      style={{ marginLeft: 10, width: 160 }}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </>
);

export default SearchBar;
