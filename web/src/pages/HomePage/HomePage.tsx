import "./styles.scss";
import Carousel from "../../components/templates/NewCarousel";
import Review from "../../components/templates/Review";

const HomePage: React.FC = () => {
  return (
    <>
      <Carousel />;
      <Review />
    </>
  );
};

export default HomePage;
