import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledTitle = styled.p`
  text-align: center;
  margin: 8px 0;
`;
export const StyledDate = styled.p`
  text-align: center;
  color: gray;
  font-size: 12px;
  margin: 6px 0;
`;
export const StyledImage = styled.img``;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    background-color: #fff;
  }
`;
