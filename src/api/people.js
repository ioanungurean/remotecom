import { HOST } from 'constants/index';

export const fetchPeople = async (employmentTypes, search) => {
  const employment = employmentTypes.length === 1 ? employmentTypes.toString() : '';

  const params = {
    ...(employment && { employment }),
    ...(search && { name_like: search }),
  };

  const queryString = new URLSearchParams(params).toString();
  const queryStringWithQuestionMark = queryString ? `?${queryString}` : queryString;

  return fetch(`${HOST}/people${queryStringWithQuestionMark}`).then((res) => res.json());
};
