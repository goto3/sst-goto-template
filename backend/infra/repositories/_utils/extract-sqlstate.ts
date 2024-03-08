export const extractSqlState = (error: Error) => {
  if (!(error?.message && typeof error.message === 'string')) return undefined;

  const regex = /SQLState: (\d+)/;
  const { message } = error;
  const match = message.match(regex);

  return match ? match[1] : undefined;
};

export default extractSqlState;
