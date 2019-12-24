import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import { parseTypeReference } from "graphql/language/parser";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }

`;

class CreateItem extends Component {
  state = {
    title: "Cool shoes",
    description: "lovely ones",
    image: "dog.jpg",
    largeImage: "largeDog.jpg",
    price: 10
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type == "number" ? parseFloat(value) : value;
    console.log({ name, type, value });
    this.setState({ [name]: val });
  };
  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          console.log(this.state);
        }}
      >
        <fieldset>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
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
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    );
  }
}

CreateItem.propTypes = {};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
