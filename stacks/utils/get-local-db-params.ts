const { LOCAL_DB_CONNECTION } = process.env;

const LOCAL_DB_PARAMS = {
  DB_CONNECTION: LOCAL_DB_CONNECTION || '',
};

export default LOCAL_DB_PARAMS;
