import styled, { css } from 'styled-components';

export const StyledControl = styled.span`
  position: relative;

  display: inline-block;

  width: 20px;
  height: 20px;
  margin: 2px 8px 0 0;

  transform: scale(0.75);
  vertical-align: middle;

  color: var(--colors-darkBlue);
  border: 1px solid var(--colors-greekLilac);
  border-radius: 2px;
  background-color: inherit;
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  line-height: 1.5;

  position: absolute;

  padding: 11px 23px;

  cursor: pointer;

  opacity: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0;
  outline: 0;
  background-color: transparent;

  &:checked + ${StyledControl} {
    border-color: var(--colors-royalPurple);
  }

  &:checked + ${StyledControl}:after {
    position: absolute;
    top: 4px;
    left: 4px;

    display: block;

    width: 10px;
    height: 10px;

    content: '';

    border-radius: 2px;
    background-color: var(--colors-royalPurple);
  }
`;

export const StyledCheckbox = styled.label`
  font-weight: 500;

  display: flex;

  padding: 10px 12px;

  cursor: pointer;

  border: 1.5px solid var(--colors-greekLilac);
  border-radius: 12px;

  justify-content: center;
  align-items: center;
  align-items: flex-start;

  ${({ checked }) =>
    checked &&
    css`
      background-color: var(--colors-linkWater);
    `}

  &:hover {
    background-color: var(--colors-linkWater);
  }

  &:focus-within {
    box-shadow: 0px 0px 0px 2px var(--colors-irisBlue);
    background-color: var(--colors-linkWater);
  }
`;

export const StyledLabel = styled.span`
  font-weight: 500;
  font-size: 14px;

  color: var(--darkBlue);
`;
