import { gql, useQuery } from "urql";

const PostsQuery = gql`
  query MyQuery {
    posts {
      id
      content
    }
  }
`;

const Posts = () => {
  const [result] = useQuery({
    query: PostsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <ul>
      {data.posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </ul>
  );
};

function App() {
  return (
    <>
      <h1>Posts</h1>
      <Posts />
    </>
  );
}

export default App;
