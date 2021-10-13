import styled from 'styled-components';

export const ButtonStyled = styled.button`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;

  display: inline-flex;

  min-height: 44px;
  padding: 12px 24px;

  cursor: pointer;

  color: var(--colors-blank);
  border: 3px solid transparent;
  border-radius: 45px;
  background-color: var(--colors-irisBlue);
  box-shadow: 0 6px 12px rgba(98, 77, 227, 0.3);

  align-items: center;

  &:hover {
    background-color: var(--colors-royalPurple);
  }

  &:focus {
    outline: none;
    box-shadow: none;
    border: 3px solid var(--colors-oldLavander);
  }
`;
