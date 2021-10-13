import { render, screen, fireEvent } from '@testing-library/react';
import Searchbox from '../index';

describe('Searchbox', () => {
  it('renders correctly', () => {
    const { container } = render(<Searchbox placeholder="Test" />);

    expect(container).toMatchSnapshot();
  });

  it('shows the correct value', () => {
    const value = 'Searchbox';
    render(<Searchbox placeholder="Searchbox" value={value} />);

    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('calls the onChange handler', () => {
    const value = 'test';
    const spy = jest.fn();
    render(<Searchbox placeholder="Searchbox" onChange={spy} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value } });

    expect(input.value).toBe(value);
  });
});
