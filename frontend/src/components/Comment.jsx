import React, { useEffect ,useState} from 'react'
import styled from "styled-components";
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';

const Container=styled.div`
display: flex;
gap: 10px;
margin: 30px 0px;
`;

const Avatar=styled.img`
width: 50px;
height: 50px;
border-radius: 50%;`;

const Details=styled.div`
display: flex;
flex-direction: column;
gap: 10px;

width: 100%;
`;

const UserName=styled.span`
font-size:14px;
font-weight: 500;
color: ${({theme})=> theme.text};
`;

const Date=styled.span`
font-size: 12px;
font-weight: 400;
color: ${({theme})=> theme.textSoft};
margin-left: 5px;
`;

const Text=styled.span`
display: flex;
font-size: 14px;
color: ${({theme})=> theme.text};
align-items: center;  
justify-content: space-between;
`;

const DeleteButton=styled.button`
background: inherit;
color: ${({theme})=>theme.text};
border: none;
cursor: pointer;
`;  



const Comment = ({comments,setComments,comment}) => {

  const [channel, setChannel] = useState({});
  const {currentUser}=useSelector(state=>state.user)


  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/user/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);


  const deleteComment=async()=>{
    try { 
    const res=await axios.delete(`/comments/${comment._id}`);
    const newList=comments.filter((a)=>a._id!==comment._id);
    setComments(newList)
    
      toast.success("Comment Deleted Successfully", {
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
      toast.error(error, {
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
  }

  return (
    <Container>
        <Avatar src={channel.img}  />
        <Details>
            <UserName>
                {channel.name}
                <Date>1 day ago</Date>
            </UserName>
            <Text>
                {comment.content}
                {currentUser?._id===comment.userId && <DeleteButton onClick={deleteComment}  ><DeleteIcon style={{"fontSize":"20px"}} /></DeleteButton>}
            </Text>
        </Details>
    </Container>
  )
}

export default Comment