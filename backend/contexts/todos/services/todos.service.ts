import crypto from 'crypto';

export async function create() {
  const id = crypto.randomUUID();
  // write to database
  return { id };
}

export function list() {
  return Array(50)
    .fill(0)
    .map((_, index) => ({
      id: crypto.randomUUID(),
      title: `Todo #${index}`,
    }));
}
