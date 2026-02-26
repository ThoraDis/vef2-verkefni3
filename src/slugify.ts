/**
 * Slugify a string.
 * @param text Text to slugify
 * @returns Slugified string or `null` if the text cannot be slugified
 */
export function slugify(text: string){
  const slug = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text


  return slug;
}
