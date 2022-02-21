import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.scss';
import '../styles/Home.scss';
import '../assets/fonts/fonts.css';
import '../next-i18next.config';
function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: 'https://api.staging.sliike.com/graphql',
    // uri: 'http://localhost:8000/graphql',
    // uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default appWithTranslation(MyApp);
