import { createHash } from 'crypto';

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

// Iterate using Array.from to handle unicode codepoints correctly
export function characterFrequencyMap(value: string): Record<string, number> {
  const map: Record<string, number> = {};
  for (const ch of Array.from(value)) {
    map[ch] = (map[ch] || 0) + 1;
  }
  return map;
}

export function uniqueCharactersCount(value: string): number {
  return new Set(Array.from(value)).size;
}

export function wordCount(value: string): number {
  if (!value) return 0;
  return value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;
}

// Remove spaces and non-word chars for palindrome check, lowercase
export function isPalindrome(value: string): boolean {
  const normalized = Array.from(value).join('')
    .replace(/[\W_]+/g, '') // remove non-alphanumeric underscores, punctuation
    .toLowerCase();
  return normalized === normalized.split('').reverse().join('');
}

export function analyzeString(value: string) {
  const id = sha256(value);
  const freq = characterFrequencyMap(value);
  const properties = {
    length: Array.from(value).length,
    is_palindrome: isPalindrome(value),
    unique_characters: uniqueCharactersCount(value),
    word_count: wordCount(value),
    sha256_hash: id,
    character_frequency_map: freq,
  };
  return { id, value, properties };
}
