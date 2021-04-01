import DefaultErrorPage from 'next/error';

interface StatusCodeException extends Error {
  statusCode?: string | number;
}

type Props = {
  message?: string;
  status?: number;
};

export const ErrorPage = ({ message = '', status = 404 }: Props): JSX.Element => {
  if (process.browser || process.env.NODE_ENV === 'development') {
    console.info(message);
    return <DefaultErrorPage statusCode={status} />;
  }

  // This will make the server return a 404 in production
  const e = new Error() as StatusCodeException;
  e.message = message || 'Page Not Found';
  e.statusCode = status;
  throw e;
};
