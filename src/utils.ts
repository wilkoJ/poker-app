import {
  uniqueNamesGenerator,
  NumberDictionary,
  adjectives,
  colors,
} from "unique-names-generator";

const getRandomArbitrary = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

const myUniqueName = () => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, NumberDictionary.generate({ min: 0, max: 999 })],
    length: 2,
    separator: "",
    style: "lowerCase",
  });
};

const randomNumber = () => {
  return Number(NumberDictionary.generate({ min: 0, max: 200000 }));
};
export { getRandomArbitrary, myUniqueName, randomNumber };
