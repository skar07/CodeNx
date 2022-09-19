import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface ENV {
      NODE_ENV?: string;
      PORT?: number;
      MONGO_URI?: string
}

interface Config {
      NODE_ENV: string;
      PORT: number;
      MONGO_URI: string;
}

const getConfig = (): ENV => {
      return {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
            MONGO_URI: process.env.MONGO_URI
      };
};

const getSanitizedConfig = (config: ENV): Config => {
      for (const [key, value] of Object.entries(config)) {
            if (value === undefined) {
                  throw new Error(`Missing key ${key} in config.env`);
            }
      }
      return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;