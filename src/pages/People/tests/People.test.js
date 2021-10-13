import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { HOST } from '../../../constants/index';
import { fomatCurrency } from '../../../utils/index';
import { theme } from '../../../theme';
import People from '../index';
import { allPeople, peopleFilteredByName, peopleFilteredByEmployment } from '../../../mocks';

const server = setupServer(
  rest.get(`${HOST}/people`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const name_like = query.get('name_like');
    const employment = query.get('employment');

    if (name_like) {
      if (name_like === 'no') {
        return res(ctx.status(200), ctx.json([]));
      }

      return res(ctx.status(200), ctx.json(peopleFilteredByName));
    }

    if (employment) {
      return res(ctx.status(200), ctx.json(peopleFilteredByEmployment));
    }

    return res(ctx.status(200), ctx.json(allPeople));
  })
);

const renderComponent = () => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <People />
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('People', () => {
  it('renders correctly', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render the table with the correct data', async () => {
    renderComponent();
    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(allPeople.length + 1)); // +1 for the table header row
  });
  it('should change the page when Add member button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /Add member/i }));
    expect(screen.getByText(/Add member/i)).toBeInTheDocument();
  });

  it('should render a row correctly', async () => {
    renderComponent();
    await screen.findByText(allPeople[1].name);

    const rows = await screen.findAllByRole('row');

    expect(within(rows[1]).getByText(allPeople[0].name)).toBeInTheDocument();
    expect(within(rows[1]).getByText(allPeople[0].jobTitle)).toBeInTheDocument();
    expect(within(rows[1]).getByText(allPeople[0].employment)).toBeInTheDocument();
    expect(within(rows[1]).getByText(allPeople[0].country)).toBeInTheDocument();
    expect(
      within(rows[1]).getByText(
        fomatCurrency(allPeople[0].salary, allPeople[0].currency).replace(/\xa0/g, ' ')
      )
    ).toBeInTheDocument();
  });

  it('should update the table when searching', async () => {
    renderComponent();
    userEvent.type(screen.getByRole('textbox'), 'Something');
    expect(screen.getByRole('textbox')).toHaveValue('Something');

    await waitFor(
      () => expect(screen.getAllByRole('row')).toHaveLength(peopleFilteredByName.length + 1) // +1 for the table header row
    );

    expect(screen.getByText(peopleFilteredByName[0].name)).toBeInTheDocument();
    expect(screen.getByText(peopleFilteredByName[0].name)).toBeInTheDocument();
  });

  it('should show proper message when there are no results', async () => {
    renderComponent();
    userEvent.type(screen.getByRole('textbox'), 'no');
    expect(screen.getByRole('textbox')).toHaveValue('no');

    await waitFor(() => expect(screen.getByText('No employees found...')).toBeInTheDocument());
  });

  it('should update the table when a checkbox is clicked', async () => {
    renderComponent();

    userEvent.click(screen.getByText('Employee'));
    expect(screen.getByLabelText('Employee')).toBeChecked();

    await waitFor(
      () => expect(screen.getAllByRole('row')).toHaveLength(peopleFilteredByName.length + 1) // +1 for the table header row
    );

    expect(screen.getByText(peopleFilteredByEmployment[0].name)).toBeInTheDocument();
    expect(screen.getByText(peopleFilteredByEmployment[0].name)).toBeInTheDocument();
  });

  it('the Edit links should have the correct href', async () => {
    renderComponent();

    const editLinks = await screen.findAllByText('Edit');

    expect(editLinks[0]).toHaveAttribute('href', `/people/edit/${allPeople[0].id}`);
    expect(editLinks[3]).toHaveAttribute('href', `/people/edit/${allPeople[3].id}`);
  });
});
