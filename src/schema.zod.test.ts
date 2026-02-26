import { describe, it } from 'node:test';
import assert from 'node:assert';
import { pagingSchema,newsSchema,authorSchema } from './schema.zod.js';

void describe('pagingSchema', () => {
  void it('give defaults when no value given', () => {
    const result1 = pagingSchema.safeParse({});
    assert.strictEqual(result1.success, true);
    assert.ok(result1.success);
    assert.strictEqual(result1.data.limit, 10);
    assert.strictEqual(result1.data.offset, 0);

  });

  void it('limit over 100 gives error', () => {
    assert.strictEqual(pagingSchema.safeParse({limit:101}).success, false);

  });

  void it('offset over 100 gives error', () => {
    assert.strictEqual(pagingSchema.safeParse({offset:101}).success, false);

  });

  void it('fail if limit less than 1', () => {
    assert.strictEqual(pagingSchema.safeParse({limit:0}).success, false);

  });

  void it('fail if offset less than 0', () => {
    assert.strictEqual(pagingSchema.safeParse({offset:-1}).success, false);

  });
});

void describe('authorSchema', () => {
  void it('validates correct author', () => {
    const result1 = authorSchema.safeParse({ 
        email:"author@author.bleb",
        name:"cool_author_420"
     });
    assert.strictEqual(result1.success, true);
    assert.ok(result1.success);
    assert.strictEqual(result1.data.email, "author@author.bleb");
    assert.strictEqual(result1.data.name, "cool_author_420");

  });

  void it('reject incorrect email', () => {
    assert.strictEqual(authorSchema.safeParse({
        email:"notemail",
        name:"cool_author_420"
        }).success, false);

  });

  void it('reject incorrect name', () => {
    assert.strictEqual(authorSchema.safeParse({
        email:"thisemail@realemail.org",
        name:""
        }).success, false);

  });
});

void describe('newsSchema', () => {
  void it('validates correct news', () => {
    const result1 = newsSchema.safeParse({ 
        title:"Real news",
        excerpt:"This is good real news",
        content: "There has never been news like this it is very true and real",
        published:true,
        author:"Real author"
     });

    assert.strictEqual(result1.success, true);
    assert.ok(result1.success);
    assert.strictEqual(result1.data.title, "Real news");
    assert.strictEqual(result1.data.excerpt, "This is good real news");
  });

  void it('reject incorrect title', () => {
    assert.strictEqual(newsSchema.safeParse({
        title:"",
        excerpt:"This is good real news",
        content: "There has never been news like this it is very true and real",
        published:true,
        author:"Real author"
        }).success, false);

  });

  void it('reject incorrect excerpt', () => {
    assert.strictEqual(newsSchema.safeParse({
        title:"Real news",
        excerpt:"",
        content: "There has never been news like this it is very true and real",
        published:true,
        author:"Real author"
        }).success, false);

  });

  void it('reject incorrect content', () => {
    assert.strictEqual(newsSchema.safeParse({
        title:"Real news",
        excerpt:"This is good real news",
        content: "",
        published:true,
        author:"Real author"
        }).success, false);

  });

  void it('reject incorrect author', () => {
    assert.strictEqual(newsSchema.safeParse({
        title:"Real news",
        excerpt:"This is good real news",
        content: "There has never been news like this it is very true and real",
        published:true,
        author:""
        }).success, false);

  });

  void it('published default is false', () => {
    const result1 = newsSchema.safeParse({ 
        title:"Real news",
        excerpt:"This is good real news",
        content: "There has never been news like this it is very true and real",
        author:"Real author"
     });

    assert.strictEqual(result1.success, true);
    assert.ok(result1.success);
    assert.strictEqual(result1.data.published, false);
    

  });
});
