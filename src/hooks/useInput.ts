import React, {
  useState,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

export default function useInput<T>(initialValue: T): ReturnTypes<T> {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    // if (validator(e.target.value as unknown)) {
    setValue(e.target.value as unknown as T);
    // }
  };

  return [value, onChange, setValue];
}
