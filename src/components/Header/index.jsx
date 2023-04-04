import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Search from "../Search";

import Container from "./style";

function Header({ list }) {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScroll = window.pageYOffset;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container stickyUp={scrollDirection === "up"}>
      <h3>
        <a href="/">MscPlay</a>
      </h3>

      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/minha-lista">
              Minha lista {list.length > 0 && <span>{list.length}</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <Search />
    </Container>
  );
}

Header.propTypes = {
  list: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  list: state.myList.list,
});

export default connect(mapStateToProps)(Header);
