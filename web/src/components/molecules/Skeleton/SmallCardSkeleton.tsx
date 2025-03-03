import React from "react";
import styles from "./smallCard.module.scss";

const SmallCardSkeleton: React.FC = () => {
  return (
    <div className={`${styles.card} ${styles.skeletonCard}`}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonDetails}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>
    </div>
  );
};

export default SmallCardSkeleton;