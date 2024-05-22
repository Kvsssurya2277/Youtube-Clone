import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
  font-size: 22px;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      Recommendations
      {videos?.map((video) => (
        <Card type="sm" key={video._id} item={video} />
      ))}
    </Container>
  );
};

export default Recommendation;