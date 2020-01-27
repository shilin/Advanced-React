import { Query } from 'react-apollo';
// import {useQuery} from '@apollo/react-hooks';

import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      permissions
    }
  }
`;

// const User = props => {
//   const payload = useQuery(CURRENT_USER_QUERY);
//   const { loading } = payload;
//   if (loading) {
//       return <p>loading user</p>;
//   }
//   return <div>{props.children(payload)}</div>;
// };


const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.PropTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
