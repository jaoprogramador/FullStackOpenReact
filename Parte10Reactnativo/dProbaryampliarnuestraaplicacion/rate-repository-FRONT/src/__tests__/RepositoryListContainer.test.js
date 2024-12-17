import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryListContainer from '../components/RepositoryListContainer'; // Ajusta la ruta según tu estructura

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

      // Verifica el nombre completo de los repositorios
      const fullNames = getAllByTestId('repositoryFullName');
      expect(fullNames[0]).toHaveTextContent('jaredpalmer/formik');
      expect(fullNames[1]).toHaveTextContent('async-library/react-async');

      // Verifica la descripción de los repositorios
      const descriptions = getAllByTestId('repositoryDescription');
      expect(descriptions[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(descriptions[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );

      // Verifica el idioma de los repositorios
      const languages = getAllByTestId('repositoryLanguage');
      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      // Verifica el recuento de bifurcaciones
      const forkCounts = getAllByTestId('repositoryForks');
      expect(forkCounts[0]).toHaveTextContent('1.6k');
      expect(forkCounts[1]).toHaveTextContent('69');

      // Verifica el recuento de estrellas
      const starCounts = getAllByTestId('repositoryStars');
      expect(starCounts[0]).toHaveTextContent('21.9k');
      expect(starCounts[1]).toHaveTextContent('1.8k');

      // Verifica el promedio de calificación
      const ratings = getAllByTestId('repositoryRating');
      expect(ratings[0]).toHaveTextContent('88');
      expect(ratings[1]).toHaveTextContent('72');

      // Verifica el recuento de reseñas
      const reviews = getAllByTestId('repositoryReviews');
      expect(reviews[0]).toHaveTextContent('3');
      expect(reviews[1]).toHaveTextContent('3');
    });
  });
});
