import {useState} from 'react';
function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');

  const handleChangeRed = event => {
    const newRedValue = event.target.value;
    setRed(newRedValue);
  };
  const handleChangeGreen = event => {
    const newGreenValue = event.target.value;
    setGreen(newGreenValue);
  };
  const handleChangeBlue = event => {
    const newBlueValue = event.target.value;
    setBlue(newBlueValue);
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
