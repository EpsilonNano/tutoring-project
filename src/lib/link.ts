// Prefixes internal paths with the base path so links work on the
// GitHub project site now, and on a custom domain later, unchanged.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function href(path: string): string {
  return base + path
}