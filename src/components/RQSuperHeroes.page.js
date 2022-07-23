import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// https://tanstack.com/query/v4/docs/guides/infinite-queries 参考
const getSuper = ({ pageParam = 1 }) => {
  // serve-json 规则
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["color"],
    getSuper,
    {
      getNextPageParam: (lastPage, pages) => {
        console.log({ lastPage, pages });
        if (pages.length < 4) {
          return pages.length + 1;
        }
        return false;
      },
    }
  );
  console.log(hasNextPage);

  if (isLoading) {
    return <h2>isLoading...</h2>;
  }

  return (
    <>
      <h2>Colors Page</h2>
      {data?.pages.map((group) => {
        return group.data.map((color) => (
          <div key={color.id}>{color.label}</div>
        ));
      })}
      <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        getNextPage
      </button>
    </>
  );
};
