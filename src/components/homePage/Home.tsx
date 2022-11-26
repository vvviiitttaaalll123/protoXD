import MangaCards from "./mangaCards/MangaCards";
import RecentlyAddedCards from "./recentlAddedCards/RecentlyAddedCards";
import SeasonalCards from "./seasonalCards/SeasonalCards";

const Home = () => {
  return (
    <>
      <SeasonalCards />
      <MangaCards />
      <RecentlyAddedCards />
    </>
  );
};

export default Home;
