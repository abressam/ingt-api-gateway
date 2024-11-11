import { name, version, description } from '../../../package.json';

const { PORT, SALT, SECRET, MS_USER_URL, MS_CLIENT_URL, MS_APPOINTMENT_URL, MS_PROFESSIONAL_URL, MESSAGE_SUCCESS } = process.env;

export default () => ({
  app: {
    name,
    port: parseInt(PORT, 10) || 3000,
    version,
    description,
    prefix: `/${name}`,
  },
  cors: {
    origin: true,
    credentials: true,
  },
  auth: {
    salt: SALT,
    secret: SECRET,
  },
  services: {
    userService: {
      url: MS_USER_URL,
    },
    clientService: {
      url: MS_CLIENT_URL,
    },
    appointmentService: {
      url: MS_APPOINTMENT_URL,
    },
    professionalService: {
      url: MS_PROFESSIONAL_URL,
    },
  },
  messages: {
    success: MESSAGE_SUCCESS,
  },
});