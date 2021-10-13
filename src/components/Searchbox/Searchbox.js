import { StyledSearchbox, StyledInput, StyledIconSearch } from './Searchbox.styled';

const Searchbox = ({ value, placeholder, onChange }) => {
  const handleChange = (ev) => {
    onChange(ev.target.value);
  };

  return (
    <StyledSearchbox htmlFor="search">
      <StyledIconSearch title="Search employees" />
      <StyledInput id="search" value={value} placeholder={placeholder} onChange={handleChange} />
    </StyledSearchbox>
  );
};

export default Searchbox;
