import { useEffect, useRef } from 'react';

interface Props {
    query: string;
    setQuery: (movieName: string) => void;
}
function Search({ query, setQuery }: Props) {
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (document.activeElement === searchRef.current) return;

            if (e.code === 'Enter' && searchRef.current) {
                searchRef.current.focus();
                setQuery('');
            }
        };
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [setQuery]);
    
    return (
        <input
            ref={searchRef}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={e => setQuery(e.target.value)}
        />
    );
}

export default Search;
