import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import cls from "classnames";

interface CardProps {
  href: string;
  name: string;
  imgUrl: string;
  className: string;
}

const Card = (props: CardProps) => {
  return (
    <Link className={styles.cardLink} href={props.href}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            alt="coffee-storefront"
            src={props.imgUrl}
            width={260}
            height={200}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
