import React from "react";
import { SearchOutlined } from "@material-ui/icons";

const SearchBar = (props) => {
  return (
    <div className="message_searchbar">
      <div className="svg">
        <SearchOutlined />
      </div>
      <input type="text" placeholder = "Search Messages..."/>
    </div>
  );
};

export default SearchBar;
