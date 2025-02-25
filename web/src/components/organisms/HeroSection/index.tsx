// import * as React from "react";
// import styles from "./styles.module.scss";
// import Button from "../../atoms/button/Button";

// interface HeroSectionProps {
//   title: string;
//   description: string;
//   imageUrl: string;
//   photo: string;
//   averageRating: number;
//   releaseDate: string;
// }


// const HeroSection: React.FC<HeroSectionProps> = ({
//   title,
//   description,
//   imageUrl,
//   photo,
//   averageRating,
//   releaseDate
// }) => {
//   return (
//     <div className={styles.heroSection}>
//       <div className={styles.heroContent}>
//         <h1>{title}</h1>
//         <p>{description}</p>
//         <img src={photo} alt={title} />
//         <p>{averageRating}</p>
//         <p>{releaseDate}</p>
//       </div>
//       <div className={styles.heroImage}>
//         <img src={imageUrl} alt={title} />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


import * as React from "react";
import styles from "./styles.module.scss";


interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  photo: string;
  averageRating: number;
  releaseDate: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  imageUrl,
  photo,
  averageRating,
  releaseDate
}) => {
  return (
    <div className={styles.heroSection}>
      {/* <div className={styles.heroContent}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div> */}

      {/* Background Image */}
      <div className={styles.heroImage}>
        <img src={imageUrl} alt={title} />
      </div>

      {/* Small IMDb-Style Card */}
      <div className={styles.movieCard}>
        <img className={styles.moviePoster} src={photo} alt={title} />
        <div className={styles.movieDetails}>
          <h3 className={styles.movieTitle}>{title}</h3>
          <p className={styles.movieDesc}>{description}</p>
          <p className={styles.rating}>⭐ {averageRating.toFixed(1)}</p>
          <p className={styles.releaseDate}>📅 {releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;




  