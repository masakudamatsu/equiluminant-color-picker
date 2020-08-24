import {useState} from 'react';
function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');

  const handleChangeRed = event => {
    setRed(event.target.value);
  };
  const handleChangeGreen = event => {
    setGreen(event.target.value);
  };
  const handleChangeBlue = event => {
    setBlue(event.target.value);
  };

  return (
    <Component
      {...pageProps}
      red={red}
      green={green}
      blue={blue}
      handleChangeRed={handleChangeRed}
      handleChangeGreen={handleChangeGreen}
      handleChangeBlue={handleChangeBlue}
    />
  );
}

export default MyApp;
