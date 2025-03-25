import 'dotenv/config';

import * as Joi from 'joi';

interface EnvVars {

  PORT: number;

  HOST: string;

  STAGE: string;

  CONNECTION_STRING: string;

  BASE_URL_LOGS: string;
}
const envsSchema = Joi.object({

  PORT: Joi.number().required(),

  HOST: Joi.string().required(),

  STAGE: Joi.string().required(),

  CONNECTION_STRING: Joi.string().required(),

  BASE_URL_LOGS: Joi.string().required(),
})
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {

  port: envVars.PORT,

  host: envVars.HOST,

  stage: envVars.STAGE,

  connectionString: envVars.CONNECTION_STRING,

  baseUrlLogs: envVars.BASE_URL_LOGS,
};