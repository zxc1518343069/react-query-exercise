import { useQuery, useMutation } from "@tanstack/react-query";
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
  const { mutate } = useMutation(addHero);
  const [heroInfo, setHeroInfo] = useState({ name: "", alterEgo: "" });

  const onSubmit = () => {
    console.log({ ...heroInfo });
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
