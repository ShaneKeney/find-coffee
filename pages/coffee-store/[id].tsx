import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CoffeeStore } from "..";
import coffeeStoresData from "../../data/coffee-stores.json";
import styles from "./coffee-store.module.css";
import cls from "classnames";

export const getStaticPaths: GetStaticPaths = async () => {
  // Map the paths to be dynamic so we don't need to input the speicifc coffee store
  // id in the paths return
  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));

  return {
    paths: paths,
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

interface CoffeeStoreProps {
  coffeeStore: CoffeeStore;
}

const CoffeeStore = (props: CoffeeStoreProps) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    // TODO: Replace with a skeleton component in the future
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={"600"}
            height={"360"}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="address-icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="neighbourhood-icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="upvote-icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
