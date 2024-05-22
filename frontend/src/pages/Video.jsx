import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { dislike, fetchStart, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Share from "../components/Share";
import Recommendations from "../components/Recommendations";
import { Rings } from "react-loader-spinner";
import { toast,Slide } from "react-toastify";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Content = styled.div`
  flex: 6;
  margin: 1.75rem;
`;

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VideoFrame = styled.video`
  max-height: 76vh;
  max-width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const [channel, setChannel] = useState({});
  const [shareModal, setshareModal] = useState(false);

  useEffect(() => {
    if (shareModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [shareModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const addView=await axios.put(`/videos/view/${videoId}`)
        const videoRes = await axios.get(`/videos/find/${videoId}`);
        const channelRes = await axios.get(
          `/user/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        
      } catch (error) {
        console.log("error is " + error);
      }
    };
    fetchData();
  }, [videoId]);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  const handleLike = async () => {
    try {
      
    await axios.put(`/user/like/${currentVideo?._id}`);
    dispatch(like(currentUser?._id));
    toast.info("Liked Successfully", {
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
    } catch (error) {
      toast.error(error.response.data.message, {
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

  const handleDislike = async () => {

    try {
      await axios.put(`/user/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser?._id));
    toast.info("Disliked Successfully", {
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
    } catch (error) {
      toast.error(error.response.data.message, {
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

  const handleSubscription = async () => {
    currentUser?.subscribedChannels?.includes(channel._id)
      ? await axios.put(`/user/unsub/${channel._id}`)
      : await axios.put(`/user/sub/${channel._id}`);

      toast.success(currentUser?.subscribedChannels?.includes(channel._id)?"Unsubscribed Successfully":"Subscribed Successfully", {
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
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      {loading ? (
          <Rings
            height="80"
            width="80"
            color="red"
            radius="2"
            wrapperStyle={{marginTop:"38vh"}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
      ) : (
        <>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo?.videoUrl} controls />
            </VideoWrapper>
            <Title>{currentVideo?.title}</Title>
            <Details>
              <Info>
                {kFormatter(currentVideo?.views)} views •
                {format(currentVideo?.createdAt)}
              </Info>
              <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo?.likes?.includes(currentUser?._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {currentVideo?.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                  {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                  {currentVideo?.dislikes?.length}
                </Button>
                <Button
                  onClick={() => {
                    setshareModal(true);
                  }}
                >
                  <ReplyOutlinedIcon />
                  Share
                </Button>
                <Button>
                  <PlaylistAddOutlinedIcon /> Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} alt="" />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {kFormatter(channel.subscribers?.length)} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo?.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>
              {currentUser && <Subscribe onClick={handleSubscription}>
                {currentUser?.subscribedChannels?.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>}
            </Channel>
            <Hr />
            {currentUser && <Comments videoId={currentVideo?._id} />}
          </Content>
          <Recommendations tags={currentVideo?.tags} />
          {shareModal && (
            <Share setshareModal={setshareModal} shareModal={shareModal} />
          )}
        </>
      )}
    </Container>
  );
};

export default Video;
