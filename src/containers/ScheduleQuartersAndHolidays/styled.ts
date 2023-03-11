import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledSubTitle = styled.h3`
  font-weight: 600;
  text-align: center;
`;

export const StyledSecondTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
`;

export const StyledSecondSubTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  margin: 10px 0;
`;

export const StyledboldText = styled.span`
  font-weight: 700;
  color: black;
`;

export const StyledText = styled.p`
  font-weight: 500;
  color: #4c4b4b;
`;

export const StyledList = styled.ul``;

export const StyledListItem = styled.li``;

export const StyledLink = styled(Link)`
  color: blue;
  text-decoration: underline;

  &:hover {
    color: #3487ed;
  }
`;
