import styled from 'styled-components';
import { ReactComponent as IconSearch } from 'theme/icons/search.svg';

export const StyledInput = styled.input`
  font-size: 14px;

  padding: 0;

  color: var(--colors-darkBlue);
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
  ::placeholder {
    color: var(--colors-lynch);
  }
`;

export const StyledSearchbox = styled.label`
  display: flex;

  padding: 0 16px;

  border: 1px solid transparent;
  border-radius: 20px;

  &:hover,
  &:focus-within {
    border: 1px solid var(--colors-selago);
  }

  &:hover {
    background-color: var(--colors-zircon);
  }

  &:focus-within {
    box-shadow: inset 1px 2px 3px var(--colors-coldIceGrey);
  }
`;

export const StyledIconSearch = styled(IconSearch)`
  margin-right: 12px;
  fill: var(--colors-lynch);
`;
