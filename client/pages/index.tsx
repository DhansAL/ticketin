import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/buildClient";

const Home: NextPage = (props) => {
  console.log(props, "props");
  return <>home paa'ge</>;
};

Home.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser")
  return data
};

export default Home;
