import React, { useState } from "react";
import { useQuery } from "react-query";
import Characters from "./Characters";

export default function Character() {
  const [page, setPage] = useState(1);

  const fetchCharacter = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );

    return response.json();
  };

  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacter,
    {
      initialData: {
        results: [],
      },
      keepPreviousData: true,
    }
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error</p>;
  }

  return (
    <div className="characters">
      {data.results.map((character) => (
        <div>
          <Characters character={character} />
        </div>
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
          Previous
        </button>
        <button
          disabled={isPreviousData && !data.info.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
