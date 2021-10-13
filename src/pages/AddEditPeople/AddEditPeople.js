import styled from 'styled-components';

const Container = styled.main`
  margin: 40px auto;
  width: 100%;
  max-width: var(--layout-width);
`;

export default function AddEditPeople({ title }) {
  return (
    <Container>
      <p>{title}</p>
      <p>Form page coming in a PR...</p>
      <p>You don't need to implement this page.</p>
    </Container>
  );
}
