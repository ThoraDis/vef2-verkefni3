import { z } from 'zod';

/**
 * Slugify a string.
 * @param text Text to slugify
 * @returns Slugified string or `null` if the text cannot be slugified
 */
export function slugify(text: string): string | null {
  const slug = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

    try {
        SlugSchema.parse(slug);
        return slug;
    } catch{
    
        return null;
    }

}

export const SlugSchema = z.string().min(3).max(255);

/**
 * Validate a slug.
 * Slug is a string
 * @see https://www.learningtypescript.com/articles/branded-types
 */
export function validateSlug(slug: unknown){
  try {
    SlugSchema.parse(slug);
    return true;
  } catch{
    return false;
  }
}