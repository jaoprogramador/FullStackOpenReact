import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating should be between 0 and 100')
    .max(100, 'Rating should be between 0 and 100'),
  reviewText: Yup.string().optional(),
});

const ReviewForm = () => {
  const history = useHistory();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async (values) => {
    try {
      const { ownerName, repositoryName, rating, reviewText } = values;

      // Ejecutar la mutación para crear la revisión
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating,
          reviewText,
        },
      });

      // Redirigir al repositorio
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      Alert.alert('Error', 'There was an issue creating your review.');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          ownerName: '',
          repositoryName: '',
          rating: '',
          reviewText: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Repository owner name"
              onChangeText={handleChange('ownerName')}
              onBlur={handleBlur('ownerName')}
              value={values.ownerName}
            />
            {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Repository name"
              onChangeText={handleChange('repositoryName')}
              onBlur={handleBlur('repositoryName')}
              value={values.repositoryName}
            />
            {errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Rating (0-100)"
              keyboardType="numeric"
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
            />
            {errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Review"
              multiline
              onChangeText={handleChange('reviewText')}
              onBlur={handleBlur('reviewText')}
              value={values.reviewText}
            />

            <Button title="Create a review" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ReviewForm;
