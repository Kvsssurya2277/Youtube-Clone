import React ,{ useEffect, useState } from 'react'
import styled from "styled-components"
import Card from '../components/Card';
import axios from "axios"
import CategoriesTab from '../components/CategoriesTab';
import { useParams } from 'react-router-dom';

const Container=styled.div`
display: flex;
justify-content: space-between;
flex-wrap:wrap;
padding: 86px 60px 0px 60px;
`;

const Categories = () => {

  const { tags } = useParams();
  
  const [video, setVideos] = useState([]);


  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  


  return (
    <>
    <CategoriesTab/>
    <Container>
      {
        video.map((item)=>{
          return <Card key={item._id} item={item} />
        })
      }
    </Container>
    </>
  )
}


export default Categories