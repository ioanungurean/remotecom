import { StyledCheckbox, StyledInput, StyledControl, StyledLabel } from './Checkbox.styled';

const Checkbox = ({ id, label, onChange }) => {
  const handleChange = () => {
    onChange(id);
  };

  return (
    <StyledCheckbox htmlFor={id}>
      <StyledInput id={id} type="checkbox" onChange={handleChange} />
      <StyledControl />
      <StyledLabel>{label}</StyledLabel>
    </StyledCheckbox>
  );
};

export default Checkbox;
