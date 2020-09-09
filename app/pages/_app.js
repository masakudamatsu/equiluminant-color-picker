import {useState} from 'react';

import {getContrastRatio} from '../utils/helpers';

import GlobalStyle from '../theme/GlobalStyle';

function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  const [contrastRatio, setContrastRatio] = useState('');
  const [hue, setHue] = useState('');

  const updateContrastRatio = (red, green, blue) => {
    const newContrastRatio = getContrastRatio(red, green, blue);
    setContrastRatio(newContrastRatio);
  };

  const handleChangeRed = event => {
    const newRedValue = event.target.value;
    setRed(newRedValue);
    updateContrastRatio(newRedValue, green, blue);
  };
  const handleChangeGreen = event => {
    const newGreenValue = event.target.value;
    setGreen(newGreenValue);
    updateContrastRatio(red, newGreenValue, blue);
  };
  const handleChangeBlue = event => {
    const newBlueValue = event.target.value;
    setBlue(newBlueValue);
    updateContrastRatio(red, green, newBlueValue);
  };
  const getHue = hue => {
    setHue(hue);
  };

  return (
    <>
      <Component
        {...pageProps}
        red={red}
        green={green}
        blue={blue}
        setRed={setRed}
        setGreen={setGreen}
        setBlue={setBlue}
        handleChangeRed={handleChangeRed}
        handleChangeGreen={handleChangeGreen}
        handleChangeBlue={handleChangeBlue}
        contrastRatio={contrastRatio}
        hue={hue}
        getHue={getHue}
      />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
