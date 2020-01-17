import { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
      permissions
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    name: '',
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
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => {
          return (
            <Form method="post"
              onSubmit={async e => {
                e.preventDefault();
                const user = await signup();
                console.log({ user });
                this.setState({name: '', email: '', password: ''});
              }}
            >
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <legend>
                  {" "}
                  <h2>Sign Up for an Account</h2>
                </legend>

                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
                <button type="submit">Sign me up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
