import App from './app';

const startSever = (): void => {
  App.app.listen(3001, (err) => {
    if (err) throw (err);
    console.log('app is running');
  });
};

startSever();
