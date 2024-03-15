import { IAnswer } from "./types";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export function checkIfArraysEquals(array1: IAnswer[], array2: IAnswer[]) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].id !== array2[i].id) return false;
  }
  return true;
}
