import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const getSuper = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

const QueryById = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["super", id],
    () => getSuper(id),
    {
      select: (res) => res.data,
      initialData: {},
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    // 如果错误，就展示错误信息
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Heroes Detail Page</h2>
      {data?.alterEgo}
    </>
  );
};

export default QueryById;
