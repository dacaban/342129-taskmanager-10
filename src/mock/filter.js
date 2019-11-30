const FILTERS = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

export const generateFilters = () => (
  FILTERS.map((it) => ({
    name: it,
    count: Math.floor(Math.random() * 10),
  }))
);
