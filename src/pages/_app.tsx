import { AppProps } from 'next/app';
import { NextPage } from 'next';

import '../styles/global.scss';

// eslint-disable-next-line arrow-body-style
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  // Pass pageProps along to component
  return <Component {...pageProps} />;
};

export default App;
