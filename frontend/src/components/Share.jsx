import React, { useEffect } from "react";
import styled from "styled-components";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import { Slide, toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 50%;
  margin: auto;
  background: ${({ theme }) => theme.bgLighter};
  padding: 26px;
`;

const Heading=styled.div`
  color: ${({theme})=> theme.textSoft};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

const IconContainer=styled.div`
display:flex;
align-items:center;
`;

const Share = ({  setshareModal }) => {
  const url = window.location.href;
  const IconStyles = { borderRadius: "50%", transform: "scale(0.65)" };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  

  const handleCopy=()=>{
    navigator.clipboard.writeText(url);
    toast.info("Url Copied Successfully", {
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



  return (
    <Container>
      <Wrapper>
        <Heading>
          <p>Share via</p>
          <ClearIcon style={{cursor:"pointer"}} onClick={()=>{setshareModal(false)}}/>
        </Heading>
        <IconContainer >
          <ContentCopyIcon style={{color:"white",margin:"8px",transform:"scale(1.4)",cursor:"pointer"}}  onClick={handleCopy} />
        <FacebookShareButton url={url} >
          <FacebookIcon style={IconStyles}/>
        </FacebookShareButton>

        <TwitterShareButton url={url}>
          <TwitterIcon style={IconStyles}/>
        </TwitterShareButton>

        <WhatsappShareButton url={url}>
          <WhatsappIcon style={IconStyles} />
        </WhatsappShareButton>

        <LinkedinShareButton url={url}>
          <LinkedinIcon style={IconStyles} />
        </LinkedinShareButton>

<EmailShareButton url={url}>
  <EmailIcon style={IconStyles}/>
</EmailShareButton>
</IconContainer>
      </Wrapper>
    </Container>
  );
};

export default Share;
