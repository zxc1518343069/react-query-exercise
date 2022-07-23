import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const getSuper = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

const QueriesById = ({ heroIds = [] }) => {
  const result = useQueries({
    queries: heroIds.map((id) => ({
      queryKey: ["heros", id],
      queryFn: () => getSuper(id),
    })),
  });

  return (
    <>
      <h2>Heroes Detail Page</h2>
      {result?.map((res, index) => (
        <h1 key={index}>{res.data?.data.name}</h1>
      ))}
    </>
  );
};

export default QueriesById;
