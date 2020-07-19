import 'dotenv/config';
import App from './app';

const PORT = process.env.APP_PORT || 3000;
const startSever = (): void => {
  App.app.listen(PORT, () => {
    console.log(`App is running in port ${PORT}`);
  });
};

startSever();
