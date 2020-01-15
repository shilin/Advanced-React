import { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({error, loading, data}) => {
      if (loading) return <p>Loading...</p>;
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head>
            <title>Sick fits! page {page || 1} of pages</title>
          </Head>
            <Link prefetch href={{
              pathname: 'items',
              query: { page: (page <= 1 ? 1 : page - 1 )},
            }} >
              <a className="prev" aria-disabled={page <= 1}>Prev</a>
            </Link>
          <p>
            Page {page} out of {pages}
          </p>
          <p>{count} Items total</p>
            <Link prefetch href={{
              pathname: 'items',
              query: { page: (page < 1 ? 1 : page + 1 )},
            }} >
              <a className="next" aria-disabled={page >= pages}>Next</a>
            </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
