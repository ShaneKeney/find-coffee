import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params?.id
      ),
    },
  };
};

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    // TODO: Replace with a skeleton component in the future
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Coffee Store {id}</h1>
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
    </div>
  );
};

export default CoffeeStore;
