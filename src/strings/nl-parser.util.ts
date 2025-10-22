export function parseNaturalLanguageQuery(query: string) {
  const normalized = query.toLowerCase();
  const filters: any = {};

  if (normalized.includes('single word') || /single-word|single word/.test(normalized)) {
    filters.word_count = 1;
  }

  if (normalized.includes('palindrom')) {
    filters.is_palindrome = true;
  }

  const longer = normalized.match(/longer than (\d+)\s*characters?/);
  if (longer) filters.min_length = parseInt(longer[1], 10) + 1;

  const shorter = normalized.match(/shorter than (\d+)\s*characters?/);
  if (shorter) filters.max_length = parseInt(shorter[1], 10) - 1;

  const contains = normalized.match(/contain(?:ing|s)?(?: the)? letter (\w)/) ||
                   normalized.match(/containing (\w)/) ||
                   normalized.match(/contain (\w)/);
  if (contains) filters.contains_character = contains[1];

  if (Object.keys(filters).length === 0) {
    throw new Error('Unable to parse natural language query');
  }

  return {
    original: query,
    parsed_filters: filters,
  };
}
