import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

type ContentProps = {
  parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
