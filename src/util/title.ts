import toTitleCase from 'to-title-case';

export function generateTitle(
  name: string | undefined,
  title: string | undefined,
) {
  if (title) {
    return title;
  } else if (!name || title === '') {
    return undefined;
  }
  return toTitleCase(name);
}
