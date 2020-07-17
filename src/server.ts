import 'dotenv/config';
import App from './app';

const PORT = process.env.PORT || 3000;
const startSever = (): void => {
  App.app.listen(PORT, (err) => {
    if (err) throw (err);
    console.log(`App is running in port ${PORT}`);
  });
};

startSever();
