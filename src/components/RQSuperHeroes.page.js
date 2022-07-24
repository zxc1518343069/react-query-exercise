import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getSuper = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const addHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    ["super"],
    getSuper
  );
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addHero, {
    onMutate: async (addHero) => {
      // 取消传出的刷新状态。保证数据不会被覆盖
      await queryClient.cancelQueries(["super", { exact: true }]);
      const previousValue = queryClient.getQueryData(["super"]);
      queryClient.setQueryData(["super"], (old) => ({
        ...old,
        data: [
          ...old.data,
          Object.assign(
            { ...addHero },
            {
              id: old?.data?.length + 1,
            }
          ),
        ],
      }));
      // 一定要返回
      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["super"], previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(["super"]);
    },
  });
  const [heroInfo, setHeroInfo] = useState({ name: "", alterEgo: "" });

  const onSubmit = () => {
    mutate({ ...heroInfo });
    setHeroInfo({ name: "", alterEgo: "" });
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    // 如果错误，就展示错误信息
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <input
        value={heroInfo.name}
        type="text"
        placeholder="name"
        onChange={(value) => {
          setHeroInfo((state) => ({
            ...state,
            name: value.target.value,
          }));
        }}
      />
      <input
        type="text"
        value={heroInfo.alterEgo}
        placeholder="alterEgo"
        onChange={(value) => {
          setHeroInfo((state) => ({
            ...state,
            alterEgo: value.target.value,
          }));
        }}
      />
      <button onClick={() => onSubmit()}>addHero</button>
      <button onClick={refetch}>fetching</button>

      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
