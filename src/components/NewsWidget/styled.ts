import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledImage = styled.img`
  border: solid 1px gray;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 90%;
`;

export const StyledWrapper = styled.div`
  width: 100%;
`;
export const StyledTitle = styled.h3`
  align-self: flex-start;
  font-size: 20px;
  color: #515156;
`;

export const StyledNewsTitle = styled.h3`
  align-self: flex-start;
  margin: 6px 0;
  color: #515156;
`;

export const StyledNoteLink = styled(Link)`
  font-weight: 500;
  align-self: flex-start;
  font-size: 14px;
`;

export const StyledDate = styled.p`
  color: gray;
  font-size: 12px;
  margin: 6px 0;
`;

export const StyledLink = styled(Link)``;
