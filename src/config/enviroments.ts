import { envs } from "./envs";

export enum Environments {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export const environmentFiles: Record<Environments, string> = {
  [Environments.Development]: '.env',
  [Environments.Staging]: '.staging.env',
  [Environments.Production]: '.production.env',
};

export const envFilePath = environmentFiles[envs.stage as Environments] || '.env';