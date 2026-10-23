/**
 * Resolves a file in /public against the configured base URL,
 * so the site works at a domain root or in a sub-folder.
 */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
