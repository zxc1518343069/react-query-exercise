import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const getSuper = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const onSuccess = (res) => {
  // 这里接收到的res 为 经过过滤之后的res
  console.log(res);
};

const onError = (err) => {
  console.log(err.message);
};
export const RQSuperHeroesPage = () => {
  // 更多状态请参考 https://tanstack.com/query/v4/docs/reference/useQuery
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ["super"],
    getSuper,
    {
      enabled: false,
      // cacheTime: 20000, // 设置缓存时间。当缓存时间内切换路由 走缓存。否则将被垃圾回收
      // staleTime: 20000, // 过时时间。 即在这个时间内 数据不会重新请求。超过
      // refetchOnMount: true, // 组件挂载时刷新数据 默认为 `true`  可选 `true|false|always` 。区别在于 设置为`true` 时，数据旧时请求(缓存状态为`stale`),`always` 则是总是请求。`false` 代表不请求。
      // refetchOnWindowFocus: true, //  浏览器窗口获得焦点时，含义同上 true / false / 'always'
      // refetchInterval: 2000, // 可选 轮训时间 number ｜ 函数，失去焦点的时候不会请求
      // refetchIntervalInBackground: true, // 可选 轮询在后台也会执行,
      retry: 1,
      onSuccess,
      onError,
      select: (res) => {
        // console.log(res);
        return res.data;
      },
      initialData: [], // 初始化数据
    }
  );
  // cacheTime，staleTime两者差异在于，服务端数据发生变化。假设设置时间相同。切换路由再切换回来，staleTime  不会重新请求数据。而cacheTime先走缓存再重新请求数据。
  //`cacheTime` 更注重于在不访问时多久过期。`staleTime` 则是多久不更新数据。

  // console.log(isLoading, isFetching);
  // isLoading 和 isFetch 的区别在于  isLoading  更多是在没有缓存的条件下 第一次请求数据做的。
  // isFetching 表现在请求，即 只要请求就有状态改变。
  // V3 写法 if (isLoading || isFetching)  enable 相较于 V3 差异  请看https://tanstack.com/query/v4/docs/guides/disabling-queries?from=reactQueryV3&original

  // 不使用enable 时
  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }

  // 使用 enable
  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    // 如果错误，就展示错误信息
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      <button onClick={refetch}>获取</button>
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
