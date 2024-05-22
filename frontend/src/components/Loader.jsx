import React from 'react'
import styled from 'styled-components'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

const Container=styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    `;

const Progress=styled.div`
    background-color: transparent;
	border-radius: 20px;
	position: relative;
	margin: 15px 0;
	height: 30px;
	width: 300px;
`;

const ProgressDone=styled.div`
background:  rgba(196, 48, 43, 1);
border-radius: 20px;
color: ${({theme})=>theme.text};
display: flex;
align-items: center;
justify-content: center;
height: 100%;
width: 0;
opacity: 0;
transition: 300ms linear 0.1s;
opacity: 1;
width: ${props=>props.width}%;
`;


const Loader = ({perc}) => {

  return (
    <Container>
    <Progress>
        <ProgressDone width={perc} >
            {perc}%
        </ProgressDone>
    </Progress>
    {perc===100 && <DownloadDoneIcon style={{"color":"#46d046","fontSize":"32px"}} />}
    </Container>
  )
}

export default Loader