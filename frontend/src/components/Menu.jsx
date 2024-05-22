import React from "react";
import styled from "styled-components";
import Gtube from "../img/share.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1.1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  letter-spacing: 1px;
  gap: 36px;
  padding: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  gap: 8px;
`;

const Img = styled.img`
  height: 26px;
  margin-top: 4px;
`;

const Item = styled.div`
  font-size: 14px;
  display: flex;
  padding: 6px 12px;
  align-items: center;
  width: auto;
  margin: 0px 20px;
  gap: 32px;

  cursor: pointer;
  :hover {
    border-radius: 8px;
    background: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 0px 16px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 8px 0px 8px 28px;
`;

const Button = styled.button`
  padding: 4px 12px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSoft};
  margin: 4px 0px;
  text-align: center;
  letter-spacing: 2px;
`;

const Menu = ({ setShowSideBar, darkMode, setDarkMode }) => {

  const {currentUser}=useSelector(state=>state.user)
  const navigate=useNavigate();

  const handleCategoryNav=(e)=>{
    navigate(`/category/${(e.target.innerText).toLowerCase()}`)
  }


  return (
    <Container>
      <Logo>
        <MenuOutlinedIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowSideBar(false);
          }}
        />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Header>
            <Img src={Gtube} />
            Eros
          </Header>
        </Link>
      </Logo>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            <p style={{ textAlign: "left", width: "100%" }}>Home</p>
          </Item>
        </Link>
        <Link to="/trending" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <ExploreOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Explore</p>
        </Item>
        </Link>
        
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
        <Item>
          <SubscriptionsOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Subscription</p>
        </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Library</p>
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>History</p>
        </Item>
        <Hr />
        {!currentUser && <><Login>
          Sign in to like videos, comment, and subscribe.
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              {" "}
              <AccountCircleOutlinedIcon /> SIGN IN
            </Button>
          </Link>
        </Login>
        <Hr /></>}
        <Title>CATEGORIES</Title>




          <Item onClick={(e)=>handleCategoryNav(e)}>
            <LibraryMusicOutlinedIcon />
            <p style={{ textAlign: "left", width: "100%" }}>Music</p>
          </Item>
        




        <Item onClick={(e)=>handleCategoryNav(e)}>



          <SportsBasketballOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Sports</p>
        </Item>
        <Item onClick={(e)=>handleCategoryNav(e)}>
          <SportsEsportsOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Gaming</p>
        </Item>
        <Item onClick={(e)=>handleCategoryNav(e)}>
          <MovieOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Movies</p>
        </Item>
        <Item onClick={(e)=>handleCategoryNav(e)}>
          <ArticleOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>News</p>
        </Item>
        <Hr />

        <Title>SETTINGS</Title>
        <Item>
          <SettingsOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Settings</p>
        </Item>
        <Item>
          <FlagOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Report</p>
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Help</p>
        </Item>
        <Item
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <SettingsBrightnessOutlinedIcon />
          <p style={{ textAlign: "left", width: "100%" }}>Switch Mode</p>
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
