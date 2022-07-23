import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSuper = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

const QueryById = () => {
  const { isLoading: isLoading1, data: data1 } = useQuery(
    ["super", 1],
    () => getSuper(1),
    {
      select: (res) => res.data,
      initialData: {},
    }
  );
  const { isLoading: isLoading2, data: data2 } = useQuery(
    ["super", 3],
    () => getSuper(3),
    {
      select: (res) => res.data,
      initialData: {},
    }
  );

  if (isLoading1 || isLoading2) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Heroes Detail Page</h2>
      {data1?.alterEgo}
      <div>{data2?.alterEgo}</div>
    </>
  );
};

export default QueryById;
