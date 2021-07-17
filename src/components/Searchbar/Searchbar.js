import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import s from "./Searchbar.module.scss";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("enter something");
      return;
    }

    // Проп который передается форме для вызова при сабмите
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.defaultProps = {
  onSubmit: () => null,
};

Searchbar.propType = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
