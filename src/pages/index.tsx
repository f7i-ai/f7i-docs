import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    // Immediately redirect to /docs/intro
    history.replace('/docs/intro');
  }, [history]);

  // Return null since we're redirecting
  return null;
}
