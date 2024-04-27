
interface Props {
  moviesLength: number;
}

function NumResults({ moviesLength }: Props) {
  return (
    <p className='num-results'>
      Found <strong>{moviesLength || 0}</strong> results
    </p>
  );
}

export default NumResults;
