const { test, describe } = require('node:test');
const assert = require('node:assert');
const { average } = require('../utils/average'); // Ajusta la ruta si es necesario

describe('average', () => {
  test('of one value is the value itself', () => {
    const blogs = [{ likes: 5 }];
    const result = average(blogs);
    assert.strictEqual(result, 5);
  });

  test('of many is calculated right', () => {
    const blogs = [
      { likes: 5 },
      { likes: 10 },
      { likes: 15 },
    ];
    const result = average(blogs);
    assert.strictEqual(result, 10); // (5 + 10 + 15) / 3 = 10
  });

  test('of empty array is zero', () => {
    const result = average([]);
    assert.strictEqual(result, 0); // Debería devolver 0
  });
});



