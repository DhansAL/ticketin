import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/buildClient";

const Home: NextPage = (props) => {
  return <>welcum</>;
};

Home.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser")
  return data
};

export default Home;
