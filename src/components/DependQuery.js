import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUser = (id) => {
  return axios.get(`http://localhost:4000/users/${id}`);
};
const getChannels = (id) => {
  return axios.get(`http://localhost:4000/channels/${id}`);
};

const DependQuery = () => {
  const { isLoading, data: user } = useQuery(["user", 1], () => getUser(1), {
    select: (res) => res.data,
    initialData: {},
  });
  const userId = user?.id;
  const { isLoading2, data: channels } = useQuery(
    ["channels"],
    () => getChannels(userId),
    {
      select: (res) => res.data,
      initialData: {},
      enabled: !!userId,
    }
  );

  if (isLoading || isLoading2) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Heroes Detail Page</h2>
      <h2>user Name:</h2>
      <span>{user?.name}</span>
      <h2>channels:</h2>
      <div>
        {channels?.courses.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </>
  );
};

export default DependQuery;
