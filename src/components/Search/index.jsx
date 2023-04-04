import { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { connect } from "react-redux";
import * as SearchActions from "../../store/actions/search";

import { ContainerForm } from "./styles";

function Search({ setSearchTerm, getSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [temporaryTerm, setTemporaryTerm] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    const newSearchTerm = event.target.searchTerm.value;
    setTemporaryTerm("");
    setSearchTerm(newSearchTerm);
    getSearch();
    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  return (
    <ContainerForm onSubmit={handleSearch}>
      <input
        type="text"
        value={temporaryTerm}
        onChange={event => setTemporaryTerm(event.target.value)}
        name="searchTerm"
        placeholder="Buscar"
      />
      <button type="submit">
        <ImSearch />
      </button>
    </ContainerForm>
  );
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchTerm: state.search.searchTerm,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SearchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
