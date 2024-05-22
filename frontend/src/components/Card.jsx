import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {format} from "timeago.js"
import axios from "axios"

const Container=styled.div`

width: ${(props) => props.type === "sm" ? "100%": "280px"};
height: ${(props) => props.type ==="sm" ? "auto":"100%"};
padding-bottom: ${(props) => (props.type === "sm" ? "20px" : "14px")};
padding-top: ${(props) => (props.type === "sm" ? "12px" : "14px")};
cursor: pointer;
display: ${(props) => props.type === "sm" && "flex"};
gap:12px;
`;

const Image=styled.img`
flex:1;
width: ${(props) => (props.type === "sm" ? "100%" : "100%")};
height: ${(props) => (props.type === "sm" ? "100px" : "160px")};
background-color: #999;
border-radius: 12px;
`;

const Details=styled.div`
flex: 1;
display: flex;
margin-top: ${(props) => props.type !== "sm" && "6px"};
gap:12px;
`;

const ChannelImage=styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #999;
display: ${(props) => props.type === "sm" && "none" };
`;

const Texts=styled.div`
margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 6px 0px;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({type,item}) => {

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchChannel= async() =>{
      const res=await axios.get(`/user/find/${item.userId}`);
      setChannel(res.data)
    }
    fetchChannel()
  }, [item.userId])
  
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}


  return (
    <Link to={`/video/${item._id}`} style={{ textDecoration:"none"}} >
      <Container type={type} >
          <Image type={type} src={item.imgUrl} />
          <Details type={type} >
              <ChannelImage type={type} src={channel.img} />
              <Texts>
                <Title>{item.title}</Title>
                <ChannelName>{channel.name}</ChannelName>
                <Info>{kFormatter(item.views)} views {"\u2022"} {format(item.createdAt)} </Info>
              </Texts>
          </Details>
      </Container>
    </Link>
  )
}

export default Card