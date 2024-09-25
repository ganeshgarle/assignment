// tests/models/numberModel.test.js
const { convertToWords } = require("../../src/models/numberModel");

describe("convertToWords", () => {
  test("should convert number to words", () => {
    expect(convertToWords(0)).toBe("zero");
    expect(convertToWords(1)).toBe("one");
    expect(convertToWords(10)).toBe("ten");
    expect(convertToWords(11)).toBe("eleven");
    expect(convertToWords(20)).toBe("twenty");
    expect(convertToWords(21)).toBe("twenty one");
    expect(convertToWords(100)).toBe("one hundred");
    expect(convertToWords(123)).toBe("one hundred twenty three");
    expect(convertToWords(999)).toBe("nine hundred ninety nine");
  });

  test("should return empty string for invalid input", () => {
    expect(convertToWords(-1)).toBe("");
    expect(convertToWords(1000)).toBe("");
  });

  test("should handle numbers in range 0 to 999", () => {
    // Test numbers outside the range
    expect(convertToWords(-1)).toBe("");
    expect(convertToWords(1000)).toBe("");
  });
});
