import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledName = styled.p`
  color: blue;
  margin: 0;
  font-weight: 550;
  text-align: center;
`;
export const StyledPost = styled.p`
  color: #26262c;
  margin: 0;
  text-align: center;
`;

export const StyledPhone = styled.div`
  color: #4c4b4b;
  display: flex;
  align-items: center;
`;

export const StyledImage = styled.img`
  max-width: 150px;
  min-width: 110px;
  height: 150px;
  width: 90%;
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
`;

export const StyledLink = styled(Link)`
  color: blue;
`;
