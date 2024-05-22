import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { DarkTheme, LightTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./pages/Categories";

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

const Wrapper = styled.div``;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
      <Container className="App">
        <BrowserRouter>
          {showSideBar && (
            <Menu
              setShowSideBar={setShowSideBar}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
          <Main>
            <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trending" element={<Home type="trending" />} />
                  <Route
                    path="subscriptions"
                    element={<Home type="subscriptions" />}
                  />

                  <Route path="category" >
                    <Route path=":tags" element={<Categories/>} />
                  </Route>

                  <Route path="search" element={<Search />} />
                  <Route path="/signin" element={<SignIn />} />

                  <Route path="video">
                    <Route path=":videoId" element={<Video />} />
                  </Route>

                </Route>
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                limit={4}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
