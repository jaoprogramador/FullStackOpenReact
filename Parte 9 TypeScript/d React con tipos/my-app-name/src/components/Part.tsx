import React from 'react';
import { CoursePart } from '../App';

type PartProps = {
  part: CoursePart;
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Background material: <a href={part.backgroundMaterial} target="_blank" rel="noopener noreferrer">{part.backgroundMaterial}</a></p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
