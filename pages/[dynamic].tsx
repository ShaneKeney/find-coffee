import Head from "next/head";
import { useRouter } from "next/router";

const DynamicRoute = () => {
  const router = useRouter();
  const { dynamic } = router.query;

  return (
    <div>
      <Head>
        <title>{dynamic}</title>
      </Head>
      <h1>Dynamic Route: {dynamic}</h1>
    </div>
  );
};

export default DynamicRoute;
