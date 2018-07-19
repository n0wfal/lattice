import gql from 'graphql-tag';

import { employees } from '../mock-data';

const filterBy = filter => e => {
  return !filter || !filter.q || e.name.indexOf(filter.q) !== -1 || e.email.indexOf(filter.q) !== -1;
};

const byId = id => e => (id !== 0 && !id) || e.id === id;

const orderBy = (list, { field, direction }) =>
  list.sort((a, b) => {
    let x = -1;
    let y = 1;
    if (direction === 'desc') {
      x = 1;
      y = -1;
    }
    if (a[field] < b[field]) return x;
    if (a[field] > b[field]) return y;
    return 0;
  });

export default {
  defaults: {
    allEmployees: employees
  },
  resolvers: {
    Query: {
      allEmployees: (_, params, { cache }) => {
        const query = gql`
          query getAllEmployees {
            allEmployees @client {
              id
              name
              email
              position
              department
            }
          }
        `;
        const previous = cache.readQuery({ query });

        if (!params) return previous.allEmployees;

        const { id, page, perPage, filter, order } = params;

        let results = previous.allEmployees;

        if (order) {
          results = orderBy(results, order);
        }

        results = results.filter(byId(id)).filter(filterBy(filter));

        if (page || perPage) {
          const from = page * perPage;
          const to = from + perPage;
          results = results.slice(from, to);
        }

        return results;
      },
      _allEmployeesMeta: (_, { filter }, { cache }) => {
        const query = gql`
          query getAllEmployees {
            allEmployees @client {
              id
              name
              email
              position
              department
            }
          }
        `;
        const previous = cache.readQuery({ query });

        return {
          __typename: '_allEmployeesMeta',
          count: previous.allEmployees.filter(filterBy(filter)).length
        };
      }
    },
    Mutation: {
      createEmployee: (_, { id, name, email, position, department }, { cache }) => {
        const query = gql`
          query getAllEmployees {
            allEmployees @client {
              id
              name
              email
              position
              department
            }
          }
        `;
        const previous = cache.readQuery({
          query
        });

        const newEmployee = {
          id,
          name,
          email,
          position,
          department,
          __typename: 'Employees'
        };

        cache.writeQuery({
          query,
          data: {
            allEmployees: previous.allEmployees.concat([newEmployee])
          }
        });

        return newEmployee;
      },
      updateEmployee: (_, { id, name, email, position, department }, { cache }) => {
        const data = { id, name, email, position, department, __typename: 'Employees' };
        cache.writeData({ id: `Employees:${id}`, data });
        return null;
      }
    }
  }
};