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
  const clint = useQueryClient();
  const { mutate } = useMutation(addHero, {
    onSuccess: (addDate) => {
      // 作用 告诉缓存这个key值得缓存无效，重新获取数据
      // clint.invalidateQueries("super");

      // 作用，重新设置 缓存key 的值。
      // 在某些场景下 add 值被返回，直接设置进缓存中，可以减少一次网络请求
      clint.setQueryData(["super"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, addDate.data],
        };
      });
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
