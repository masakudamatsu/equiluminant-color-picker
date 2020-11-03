import {request} from 'graphql-request';
import useSWR from 'swr';

function useData(chroma, contrastRatio) {
  const fetcher = query => request('http://localhost:4000/graphql', query);

  const query = `
    {
      feed(contrastRatio: ${contrastRatio}, chroma: ${chroma}, orderBy: [{ hue: asc }]) {
        red
        green
        blue
        contrast_ratio
        hue
        chroma
      }
    }
  `;

  const {data, error} = useSWR(query, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }; // following the example in https://swr.vercel.app/getting-started#make-it-reusable
}

export default useData;
