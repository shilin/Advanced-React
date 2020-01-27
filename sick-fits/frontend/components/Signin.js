import { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signin(email: $email, password: $password) {
      id
      name
      email
      password
      permissions
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <Mutation
      mutation={SIGNIN_MUTATION}
      variables={this.state}
      refetchQueries={[{query: CURRENT_USER_QUERY}]}
       >
        {(signin, { error, loading }) => {
          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const user = await signin();
                console.log({ user });
                this.setState({email: "", password: "" });
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <legend>
                  {" "}
                  <h2>Sign In</h2>
                </legend>

                <label htmlFor="email">
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
                <button type="submit">Sign in!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
