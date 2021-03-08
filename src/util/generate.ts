import { StandardGenerator } from '../base';

export const subgenerate = (
  generator: StandardGenerator | Record<string, any>,
) => (generator.generate ? generator.generate() : generator);

export const subgenerateMany = (
  generators: StandardGenerator[] | Record<string, any>,
) => {
  return generators.map(subgenerate);
};
