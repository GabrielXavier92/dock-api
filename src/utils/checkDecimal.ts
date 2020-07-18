const checkDecimal = (value: any): boolean => {
  const regDec = new RegExp(/^\d{1,128}(\.\d{1,2})?$/g);
  return regDec.test(value.toString());
};

export default checkDecimal;
