import React from "react";
import PropTypes from "prop-types";

import Container from "./style";

export default function List({ children }) {
  return (
    <Container>
      <ul>{children}</ul>
    </Container>
  );
}

List.propTypes = {
  children: PropTypes.node.isRequired,
};
