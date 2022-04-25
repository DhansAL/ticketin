import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/buildClient";
type ResponseProps = {
  currentUser: {
    email: string;
    iat: number;
    id: string
  }
}
const Home: NextPage<ResponseProps> = (props) => {
  console.log(props.currentUser, "props");
  return <>home paa'ge</>;
};

Home.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser")
  return data
};

export default Home;
