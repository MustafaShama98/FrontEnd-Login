import Card from "../components/Card";
import { posts } from "../data";
import {useAuthUser} from 'react-auth-kit'


const Home = () => {
  const auth = useAuthUser()

  return (

    <div className="home">
    <p> Welcome {auth().firstName + ' '+ auth().lastName}!</p>
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
