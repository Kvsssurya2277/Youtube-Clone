import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../fireabase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const BgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  min-height: 100%;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  overflow: hidden;
  width: 878px;
  max-width: 100%;
  min-height: 400px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 2;
  `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 1;
  ${(props) => (props.signIn !== true ? `transform: translateX(100%);` : null)}
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.bgLighter};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  border: none;
  padding: 6px;
  margin: 10px 0;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text}; ;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #cc1a00;
  background-color: #cc1a00;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 10px;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }

  &:disabled{
    opacity: 0.5;
    cursor:no-drop ;
  } 
  [disabled]{
    opacity: 0.5;
    cursor:no-drop ;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 1;
  ${(props) => (props.signIn !== true ? `transform: translateX(-100%);` : null)}
`;

const Overlay = styled.div`
  background: #cc1a00;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signIn !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signIn !== true ? `transform: translateX(0);` : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 4npm 00;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const SignIn = () => {
  const [signIn, setSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(password===repeatedPassword && password!=="")
      setIsVerified(true)
    else 
      setIsVerified(false)
  }, [password,repeatedPassword])
  

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      toast.success("Logged In Successfully", {
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
      navigate("/");

    } catch (err) {
      dispatch(loginFailure());
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

  const handleRegister=async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", { name, password, email });
      dispatch(loginSuccess(res.data));
      toast.success("Registered Successfully", {
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
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
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
        })
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((res) => {
        axios
          .post("/auth/google", {
            name: res.user.displayName,
            email: res.user.email,
            img: res.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            toast.success("Logged In Successfully", {
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
            navigate("/");
          });
      })
      .catch((err) => {loginFailure()
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
          });});
  };

  return (
    <BgContainer>
      <Container>
        <SignUpContainer signIn={signIn}>
          <Form>
            <Title>Create Account</Title>
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              autocomplete="on"
            ></Input>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autocomplete="on"
            ></Input>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autocomplete="new-password"
            ></Input>
            <Input
              type="password"
              placeholder="Re-type Password"
              onChange={(e) => {
                setRepeatedPassword(e.target.value);
              }}
              autocomplete="new-password"
            ></Input>
            <Button onClick={(e) => {handleRegister(e)}} disabled={!isVerified}>Sign Up</Button>
            <GoogleButton
              style={{ marginTop: "20px" }}
              onClick={signInWithGoogle}
            />
          </Form>
        </SignUpContainer>

        <SignInContainer signIn={signIn}>
          <Form>
            <Title>Sign In</Title>
            <Input
              type="Username"
              placeholder="Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autocomplete="current-password"
            ></Input>
            <Anchor href="#">Forgot Your Password</Anchor>
            <Button onClick={handleLogin}>Sign In</Button>
            <GoogleButton
              style={{ marginTop: "20px" }}
              onClick={signInWithGoogle}
            />
          </Form>
        </SignInContainer>
        <OverlayContainer signIn={signIn}>
          <Overlay signIn={signIn}>
            <LeftOverlayPanel signIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>To keep connected with us please login</Paragraph>
              <GhostButton onClick={() => setSignIn(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                <GhostButton onClick={() => setSignIn(false)}>
                  Sign Up
                </GhostButton>
              </Paragraph>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </BgContainer>
  );
};

export default SignIn;
