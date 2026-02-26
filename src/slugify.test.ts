import { describe, it } from 'node:test';
import assert from 'node:assert';
import { slugify} from './slugify.js';

void describe('slugs', () => {
  void it('validate slug', () => {
    const slug = slugify("this slug")
    assert.strictEqual(slug, "this-slug");
  });

  void it('empty slug', () => {
    const slug = slugify("")
    assert.strictEqual(slug, null);

  });

  void it('slug at least 3 chars', () => {
    const slug = slugify("fg")
    assert.strictEqual(slug, null);
  });
});