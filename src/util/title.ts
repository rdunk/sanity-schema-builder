import toTitleCase from 'to-title-case';

export function generateTitle(name: string, title: string | undefined) {
  if (title) {
    return title;
  } else if (title === '') {
    return undefined;
  }
  return toTitleCase(name);
}
