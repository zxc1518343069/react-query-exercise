import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getSuper = (page) => {
  // serve-json 规则
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
};

export const RQSuperHeroesPage = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, isFetching, isPreviousData } = useQuery(
    ["color", page],
    () => getSuper(page),
    {
      keepPreviousData: true, // 保留上次数据,如果没有设置这个属性，你每次加载新需求将会从loading为true
    }
  );

  if (isLoading) {
    return <h2>isLoading...</h2>;
  }

  return (
    <>
      <h2>Colors Page</h2>
      {data?.data.map((color) => {
        return <div key={color.id}>{color.label}</div>;
      })}
      <button disabled={page <= 1} onClick={() => setPage((page) => page - 1)}>
        getPrePage
      </button>
      <button disabled={page >= 4} onClick={() => setPage((page) => page + 1)}>
        getNextPage
      </button>

      <h2>{isFetching ? "isFetching" : ""}</h2>
      <h2>{isPreviousData.toString()}</h2>
    </>
  );
};
