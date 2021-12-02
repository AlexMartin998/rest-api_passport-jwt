import { connect } from 'mongoose';

import config from './config/config';

(async () => {
  try {
    const db = await connect(config.DB.URI);
    console.log('DB connected to', db.connection.name);
  } catch (err) {
    console.log(err);
  }
})();
