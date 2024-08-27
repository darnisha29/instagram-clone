import CardPage from "@/components/Layout/card";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Home = () => {
  return <CardPage posts={[]}/>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
