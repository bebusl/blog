const EMAIL = "email";
const PASSWORD = "password";

interface Props {
  type: typeof EMAIL | typeof PASSWORD;
  value: string;
}

const regexPattern = {
  [EMAIL]: /^[a-zA-Z0-9]{4,13}@[\w]([-_\.]?[\w])*\.[a-zA-Z]{2,3}$/,
  //[PASSWORD]: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  [PASSWORD]: /\w{4,18}/,
};

export const validator = ({ type, value }: Props) => {
  const regex = regexPattern[type];
  const isValid = regex.test(value);
  return isValid;
};
