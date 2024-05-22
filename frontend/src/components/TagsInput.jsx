import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';

const Wrapper = styled.div`
display: flex;
align-items: flex-start;
flex-wrap: wrap;
min-height: 48px;
width: auto;
padding: 0 8px;
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 6px;

input {
  flex: 1;
  border: none;
  height: 46px;
  font-size: 14px;
  padding: 4px 0 0 0;
  &:focus {
    outline: transparent;
  }
  background-color: inherit;
  color: ${({ theme }) => theme.text};
}
`;

const Tags = styled.ul`
display: flex;
flex-wrap: wrap;
padding: 0;
margin: 8px 0 0 0;
`;

const Tag = styled.li`
width: auto;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
color: ${({ theme }) => theme.text};
padding: 0 8px;
font-size: 14px;
list-style: none;
border-radius: 6px;
margin: 0 8px 8px 0;
gap: 6px;
background: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;

const TagsInput = ({setTag}) => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTag(tags);
  }, [tags])
  

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    event.preventDefault();
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <Wrapper>
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <span>{tag}</span>
            <i>
              {" "}
              <ClearIcon
                onClick={()=>removeTags(index)}
                style={{ "fontSize": "16px", cursor: "pointer" }}
              />{" "}
            </i>
          </Tag>
        ))}
      </Tags>
      <input
        type="text"
        placeholder="Press Enter to add tags"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}/>
    </Wrapper>
  );
};

export default TagsInput;
