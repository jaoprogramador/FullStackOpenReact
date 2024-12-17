import React from 'react';
import { render } from '@testing-library/react-native'; // O '@testing-library/react' si estás usando una app web
import '@testing-library/jest-native/extend-expect'; // Para utilizar `toHaveTextContent`
import RepositoryListContainer from '../components/RepositoryListContainer'; // Ajusta la ruta según tu estructura de proyecto

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');

      expect(repositoryItems).toHaveLength(2);

      const [firstRepository, secondRepository] = repositoryItems;

      // Verificamos la información del primer repositorio
      expect(firstRepository).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepository).toHaveTextContent('Build forms in React, without the tears');
      expect(firstRepository).toHaveTextContent('TypeScript');
      expect(firstRepository).toHaveTextContent('1.6k'); // Contamos en miles
      expect(firstRepository).toHaveTextContent('21.9k'); // Contamos en miles
      expect(firstRepository).toHaveTextContent('88');
      expect(firstRepository).toHaveTextContent('3');

      // Verificamos la información del segundo repositorio
      expect(secondRepository).toHaveTextContent('async-library/react-async');
      expect(secondRepository).toHaveTextContent('Flexible promise-based React data loader');
      expect(secondRepository).toHaveTextContent('JavaScript');
      expect(secondRepository).toHaveTextContent('69');
      expect(secondRepository).toHaveTextContent('1.8k'); // Contamos en miles
      expect(secondRepository).toHaveTextContent('72');
      expect(secondRepository).toHaveTextContent('3');
    });
  });
});
