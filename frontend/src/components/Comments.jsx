import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Comment from './Comment';


const Container=styled.div``;

const NewComment=styled.div`
display: flex;
align-items: center;
gap:10px;
`;

const Avatar=styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

const Input=styled.input`
border: none;
border-bottom: 1px solid ${({theme})=> theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100%;
color: ${({theme})=>theme.text};
font-size:14px;
`;

const Button=styled.button`
background: ${({theme})=>theme.soft};
color: ${({theme})=>theme.textSoft};
border-radius:18px;
padding: 12px;
border:none;
cursor: pointer;
font-weight: 500;
transition: all 300ms ease-in-out;
&:hover{
  background: #cc1a00;
  color: ${({theme})=>theme.text};
}
`;


const Comments = ({videoId}) => {

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const {currentUser}=useSelector((state)=>state.user)

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);


  const addComment=async ()=>{

    try{
      const commentPayload={"content":input,"videoId":videoId};
      const res=await axios.post(`/comments/`,commentPayload);
      
      setInput("");
      fetchComments();
    }
    catch(err){

    }
  }

  
  
  

  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser?.img}  />
            <Input onChange={e=>setInput(e.target.value)} placeholder="Add a comment..." value={input} />
            <Button onClick={addComment} >Comment</Button>
        </NewComment>
        {comments.map(comment=>{
          return (
            <Comment comments={comments} setComments={setComments}  key={comment._id} comment={comment} ></Comment>
          )
        })}
    </Container>
  )
}

export default Comments