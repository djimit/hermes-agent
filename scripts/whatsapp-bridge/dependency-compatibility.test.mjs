import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import qs from 'qs';

const require = createRequire(import.meta.url);

test('the bridge resolves the patched qs package', () => {
  assert.equal(require('qs/package.json').version, '6.16.1');
});

test('ordinary nested queries and comma arrays retain their encoding', () => {
  const value = { tags: ['red', 'blue'], profile: { name: 'Hermes' } };
  assert.deepEqual(qs.parse(qs.stringify(value)), value);
  assert.equal(qs.stringify({ tags: value.tags }, { arrayFormat: 'comma' }), 'tags=red%2Cblue');
  assert.deepEqual(qs.parse('tags=red,blue', { comma: true }), { tags: value.tags });
});

test('comma serialization handles non-callable and absent string coercion', () => {
  const arrays = [
    [{ toString: 'x' }],
    [Object.assign(Object.create(null), { label: 'x' })],
    [[{ toString: 'x' }]],
  ];
  for (const encodeValuesOnly of [false, true]) {
    for (const a of arrays) {
      assert.doesNotThrow(() => qs.stringify({ a }, { arrayFormat: 'comma', encodeValuesOnly }));
    }
  }
});
