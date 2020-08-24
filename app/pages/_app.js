import {useState} from 'react';
function MyApp({Component, pageProps}) {
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  return <Component {...pageProps} red={red} green={green} blue={blue} />;
}

export default MyApp;
