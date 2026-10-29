
import 'dotenv/config';

const requiredEnvVariables = ['PORT', 'NODE_ENV'];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Error de configuración: falta la variable ${variable} en el archivo .env`
    );
  }
}

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV
};

if (!Number.isInteger(env.port) || env.port < 1 || env.port > 65535) {
  throw new Error(
    'Error de configuración: PORT debe ser un puerto válido entre 1 y 65535'
  );
}
