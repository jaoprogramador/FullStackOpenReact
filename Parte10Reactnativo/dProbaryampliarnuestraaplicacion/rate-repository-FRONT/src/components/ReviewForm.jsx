import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Text } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
//import { useHistory } from 'react-router-native';
import { useNavigate } from 'react-router-native';

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  //const history = useHistory();
  const navigate = useNavigate(); 
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string()
      .required('Repository owner\'s GitHub username is required.'),
    repositoryName: Yup.string()
      .required('Repository name is required.'),
    rating: Yup.number()
      .required('Rating is required.')
      .min(0, 'Rating must be at least 0.')
      .max(100, 'Rating cannot exceed 100.'),
    text: Yup.string().optional(),
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          /* review: {
            ...values,
            rating: Number(values.rating),
          }, */
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text || '',
          },
  
          
        },
      });

      if (data?.createReview?.repositoryId) {
        
        //history.push(`/repository/${data.createReview.repositoryId}`);
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            label="Repository Owner's GitHub Username"
            onChangeText={handleChange('ownerName')}
            value={values.ownerName}
            error={touched.ownerName && errors.ownerName}
            style={styles.input}
          />
          <Text style={styles.error}>{touched.ownerName && errors.ownerName}</Text>

          <TextInput
            label="Repository Name"
            onChangeText={handleChange('repositoryName')}
            value={values.repositoryName}
            error={touched.repositoryName && errors.repositoryName}
            style={styles.input}
          />
          <Text style={styles.error}>{touched.repositoryName && errors.repositoryName}</Text>

          <TextInput
            label="Rating (0-100)"
            onChangeText={handleChange('rating')}
            value={values.rating}
            error={touched.rating && errors.rating}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.error}>{touched.rating && errors.rating}</Text>

          <TextInput
            label="Review"
            onChangeText={handleChange('text')}
            value={values.text}
            multiline
            style={[styles.input, styles.textarea]}
          />
          <Text style={styles.error}>{touched.text && errors.text}</Text>

          <Button onPress={handleSubmit} title="Submit Review" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  textarea: {
    height: 100,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default ReviewForm;
