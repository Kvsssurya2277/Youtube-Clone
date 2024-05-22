import React, { useState } from "react";
import styled from "styled-components";
import Gtube from "../img/share.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VideoCallOutlined } from "@mui/icons-material";
import Upload from "./Upload";
import { logout } from "../redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../fireabase";
import {toast, Slide } from "react-toastify";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 10px 20px;

  position: relative;
`;

const Logo = styled.div`
  position: absolute;
  top: 2;
  left: 0;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.text};
  letter-spacing: 1px;
  gap: 36px;
  margin-left: 22px;
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

const Search = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  width: 100%;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 4px 12px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SearchButton=styled.button`
  background: inherit;
  outline: none;
  border: none;
  color: ${({theme})=> theme.text};
  cursor: pointer;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.soft};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  position: relative;

  &::before {
    background: ${({ theme }) => theme.soft};
    content: "";
    width: 2px;
    height: 40px;
    margin: auto;
  }
`;

const LogOut = styled.button`
  padding: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.bg};
  font-weight: 400;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.bgLighter};
  cursor: pointer;
`;

const User = ({ currentUser }) => {
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.fromGoogle) signOut(auth);
      const res = await axios.post("/auth/signout");
      dispatch(logout());
      toast.success("Logged Out Successfully", {
        position: "bottom-center",
        transition: Slide,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-center",
        transition: Slide,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <>
      <Profile
        onClick={() => {
          setShowButton(!showButton);
        }}
      >
        <Avatar src={currentUser.img} />
        {currentUser.name}
      </Profile>
      {showButton && <LogOut onClick={(e) => handleLogOut(e)}>Sign Out</LogOut>}
    </>
  );
};

const Navbar = ({ showSideBar, setShowSideBar }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${input}`);
  };

  return (
    <>
      <Container>
        <Wrapper>
          {!showSideBar ? (
            <Logo>
              <MenuOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowSideBar(true);
                }}
              />
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Header>
                  <Img src={Gtube} />
                  Eros
                </Header>
              </Link>
            </Logo>
          ) : null}
          <Search>
            <Input
            type="search"
              placeholder="Search.."
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <SearchButton
              type="submit"
              onClick={(e) => {
                handleSearch(e);
              }}
            >
            <SearchOutlinedIcon /></SearchButton>
          </Search>
          {currentUser ? (
            <UserSection>
              <VideoCallOutlined
                style={{ cursor: "pointer", fontSize: "28px" }}
                onClick={() => {
                  setOpen(true);
                }}
              />
              <User currentUser={currentUser} />
            </UserSection>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
