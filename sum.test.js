const fuelQuote = require('./fuelQuote');
const register = require('./register');
const login = require('./login');

test('coeff works', () => {
    expect(fuelQuote.calcCoeffWithoutGal(0.01, 0.02, 0.1)).toBe(0.11);
  });

test('quote calculation works', () => {
    expect(fuelQuote.calcSuggPrice(1.5, 0.02,0.01, 0.03, 0.1)).toBe(1.71);
  });

  test('checkForm1 works', () => {
    expect(register.checkForm1("sarah", "HelloWorld@", "Hello123@")).toBeFalsy();
  }); 

test('calc amount with margin works', () => {
    expect(fuelQuote.calcAmountWithMargin(77, 1.71)).toBe(131.67);
  });

  const copyOfQuotes = require('./quotes.json');

  test('isInQuotes works', () => {
    expect(fuelQuote.isInQuotes("macbook", copyOfQuotes, 0)).toBe(0);
  }); 

  test('isInQuotes works', () => {
    expect(fuelQuote.isInQuotes("macbook", copyOfQuotes, 0)).toBe(0);
  }); 

  test('checkForm1 works', () => {
    expect(register.checkForm1("juanita", "Hello123@", "Hello123@")).toBeFalsy();
  }); 

  const copyOfDB = require('./loginInfo.json');
  test('isInDB works', () => {
    expect(login.isInDB("macbook", "Hello123@", copyOfDB, 0)).toBe(0);
  }); 


