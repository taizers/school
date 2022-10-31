import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  padding: 10px;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  background-color: #a2cffc;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledSocial = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  margin: 10px;

  @media screen and (max-width: 600px) {
    flex-direction: row;
  }
`;
