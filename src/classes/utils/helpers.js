// Shared promise-based delay used across hooks and actions
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));
