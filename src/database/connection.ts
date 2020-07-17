import * as knex from 'knex';
import * as config from '../../knexfile';

const connection = knex(config);

export default connection;
