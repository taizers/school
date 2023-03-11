import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: blue;
  text-decoration: underline;

  &:hover {
    color: #3487ed;
  }
`;
