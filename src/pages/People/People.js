import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';

import { fetchPeople } from 'api/people';
import { fomatCurrency } from 'utils/index';
import { PEOPLE_COLUMNS, EMPLOYMENT_TYPE } from 'constants/index';
import Button from 'components/Button';
import Searchbox from 'components/Searchbox';
import Checkbox from 'components/Checkbox';
import { Card, CardBody } from 'components/Card';
import {
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableThCell,
  TableCell,
} from 'components/Table';
import Text from 'components/Text';

import {
  Container,
  Wrapper,
  Header,
  StyledIconUser,
  StyledTextLight,
  StyledLoadingLogo,
  Filters,
  RightSide,
  NotFound,
} from './People.styled';

export default function People() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [debuncedSearch] = useDebounce(search, 300);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const { isLoading, data } = useQuery(['fetchPeople', employmentTypes, debuncedSearch], () =>
    fetchPeople(employmentTypes, debuncedSearch)
  );

  const handleAddNewMemberClick = () => {
    history.push('/people/new');
  };

  const handlEmploymentChange = (newEmployment) => {
    if (employmentTypes.includes(newEmployment)) {
      setEmploymentTypes(employmentTypes.filter((type) => type !== newEmployment));
    } else {
      setEmploymentTypes(employmentTypes.concat(newEmployment));
    }
  };

  const renderRows = ({ id, name, jobTitle, employment, country, salary, currency }) => {
    return (
      <TableRow key={id}>
        <TableCell emphasize>{name}</TableCell>
        <TableCell>{jobTitle}</TableCell>
        <TableCell>{employment}</TableCell>
        <TableCell>{country}</TableCell>
        <TableCell align="right">{fomatCurrency(salary, currency)}</TableCell>
        <TableCell align="right">
          <Link to={`/people/edit/${id}`}>Edit</Link>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Text size="h2">People</Text>
          {data && data.length > 0 && <StyledTextLight>{data.length} employees</StyledTextLight>}
        </Header>
        <Button onClick={handleAddNewMemberClick}>
          <StyledIconUser title="Add a new member" />
          Add member
        </Button>
      </Wrapper>
      <Card>
        <CardBody>
          <Filters>
            <Searchbox value={search} placeholder="Search employees..." onChange={setSearch} />
            <RightSide>
              {EMPLOYMENT_TYPE.map(({ id, label }) => (
                <Checkbox key={id} id={id} label={label} onChange={handlEmploymentChange} />
              ))}
            </RightSide>
          </Filters>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  {PEOPLE_COLUMNS.map(({ label, id, align }) => (
                    <TableThCell key={id} align={align}>
                      {label}
                    </TableThCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <tr>
                    <td colSpan={PEOPLE_COLUMNS.length}>
                      <StyledLoadingLogo />
                    </td>
                  </tr>
                )}
                {data && data.length > 0 && <>{data.map(renderRows)}</>}
                {data && data.length === 0 && (
                  <tr>
                    <td>
                      <NotFound size="bodySmallBold">No employees found...</NotFound>
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableWrapper>
        </CardBody>
      </Card>
      <Link to="/playground">Playground</Link>
    </Container>
  );
}
