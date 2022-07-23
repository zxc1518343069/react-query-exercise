import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const getSuper = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  // 更多状态请参考 https://tanstack.com/query/v4/docs/reference/useQuery
  const { isLoading, data, isError, error } = useQuery(["super"], getSuper);

  // isLoading 和 isFetch 的区别在于  isLoading  更多是在没有缓存的条件下 第一次请求数据做的。
  // isFetching 表现在请求，即 只要请求就有状态改变。
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
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/superheroe/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
