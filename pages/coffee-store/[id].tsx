import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Coffee Store {id}</h1>
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
    </div>
  );
};

export default CoffeeStore;
