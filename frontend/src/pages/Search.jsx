import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Categories from "../components/CategoriesTab";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 86px 60px 0px 60px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <>
      <Categories />
      <Container>
        {videos.map((video) => (
          <Card key={video._id} item={video} />
        ))}
      </Container>
    </>
  );
};

export default Search;
