import {useState} from 'react';

import {getContrastRatio} from '../utils/helpers';

function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  const [contrastRatio, setContrastRatio] = useState('');
  const [hueRange, setHueRange] = useState({
    min: '',
    max: '',
  });

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
  const getHueRange = hue => {
    const min = (Number(hue) - 15).toString();
    const max = (Number(hue) + 15).toString();
    setHueRange({min: min, max: max});
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
      hueRange={hueRange}
      getHueRange={getHueRange}
    />
  );
}

export default MyApp;
