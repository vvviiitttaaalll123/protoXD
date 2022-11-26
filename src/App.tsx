import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/homePage/Home";
import MangaLandingPage from "./components/mangaLandingPage/MangaLandingPage";
import ViewChapter from "./components/mangaLandingPage/viewChapter/ViewChapter";
import NavBar from "./components/navBar/NavBar";
import ChapterContextProvider from "./contextStore/ChapterContext";

function App() {
  // const { isTyping } = useContext(SearchContext);
  // console.log(isTyping);

  return (
    <>
      <div className="body">
        <NavBar />
      </div>
      <ChapterContextProvider>
        <Routes>
          <Route element={<Home />} path={"/"} />
          <Route element={<MangaLandingPage />} path={"/manga/*"} />
          <Route element={<ViewChapter />} path={"/chapter/*"} />
        </Routes>
      </ChapterContextProvider>
    </>
  );
}

export default App;
