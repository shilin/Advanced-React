import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import { parseTypeReference } from 'graphql/language/parser';

class CreateItem extends Component {
  state = {
    title: "Title",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type == "number" ? parseFloat(value) : value;
    console.log({ name, type, value });
    this.setState({ [name]: val });
  };
  render() {
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="price"
              required
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
        </fieldset>
        <h2>Sell an Item</h2>
      </Form>
    );
  }
}

CreateItem.propTypes = {

};

export default CreateItem;
