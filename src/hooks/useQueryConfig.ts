import { useSearchParams } from 'react-router-dom';

function useQueryConfig() {
  const [searchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  return { query };
}

export default useQueryConfig;
