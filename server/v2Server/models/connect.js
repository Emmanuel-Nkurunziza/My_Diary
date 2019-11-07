
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line import/no-mutable-exports
let pool = new Pool();

if (process.env.NODE_ENV === 'development') {
  pool = new Pool({

    connectionString: process.env.DATABASE_DEV,

  });
}

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({

    connectionString: process.env.DATABASE_DEV,

  });
}

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({

    connectionString: process.env.DATABASE_DEV,

  });
}
pool = new Pool({

  connectionString: process.env.DATABASE_DEV,

});
export default pool;
