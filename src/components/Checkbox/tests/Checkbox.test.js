import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const { container } = render(<Checkbox id="checkbox" label="Checkbox" />);

    expect(container).toMatchSnapshot();
  });

  it('shows the correct label', () => {
    render(<Checkbox id="checkbox" label="Checkbox" />);

    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });

  it('calls the onChange handler', () => {
    const id = 'test';
    const spy = jest.fn();
    render(<Checkbox id={id} label="Checkbox" onChange={spy} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(spy).toBeCalledWith(id);
  });
});
