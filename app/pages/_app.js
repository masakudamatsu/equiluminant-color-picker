import {useState} from 'react';

import {getContrastRatio} from '../utils/helpers';

function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  const [contrastRatio, setContrastRatio] = useState('');
  const [hue, setHue] = useState('');

  const handleChangeRed = event => {
    const newRedValue = event.target.value;
    setRed(newRedValue);
    const newContrastRatio = getContrastRatio(newRedValue, green, blue);
    setContrastRatio(newContrastRatio);
  };
  const handleChangeGreen = event => {
    const newGreenValue = event.target.value;
    setGreen(newGreenValue);
    const newContrastRatio = getContrastRatio(red, newGreenValue, blue);
    setContrastRatio(newContrastRatio);
  };
  const handleChangeBlue = event => {
    const newBlueValue = event.target.value;
    setBlue(newBlueValue);
    const newContrastRatio = getContrastRatio(red, green, newBlueValue);
    setContrastRatio(newContrastRatio);
  };
  const getHue = hue => {
    setHue(hue);
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
      contrastRatio={contrastRatio}
      hue={hue}
      getHue={getHue}
    />
  );
}

export default MyApp;
