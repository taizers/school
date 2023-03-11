import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledTitle = styled.h2`
  font-weight: 650;
`;
export const StyledSubTitle = styled.h3`
  font-weight: 600;
  text-align: center;
`;
export const StyledLink = styled(Link)`
  color: blue;
  text-decoration: underline;

  &:hover {
    color: #3487ed;
  }
`;
