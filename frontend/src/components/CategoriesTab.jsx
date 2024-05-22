import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CategoryList = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.bgLighter};
  overflow-x: visible;
  overflow-y: hidden;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.soft};
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  padding: 0px 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Categorys = styled.div`
  display: flex;
  position: absolute;
  top: -20;
  align-items: center;
`;

const Category = styled.button`
  padding: 7.5px 25px;
  border: 1px solid ${({ theme }) => theme.soft};
  margin: 10px 4px;
  font-weight: 400;
  white-space: nowrap;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.bg};
  transition: 200ms all;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
  font-size: 14px;
  @media (max-width: 576px) {
    & {
      padding: 5px 15px;
      font-size: 12px;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }

  &:focus {
    background-color: ${({ theme }) => theme.soft};
    font-weight: 500;
  }
`;

const CategoriesTab = () => {
  const keywords = [
    "HTML",
    "CSS",
    "JavaScript",
    "React JS",
    "Redux",
    "Node Js",
    "Express Js",
    "Firebase",
    "Next JS ",
    "Coding",
    "Angular JS",
    "Real Madrid",
    "Gatsby JS",
    "CSS",
    "Javascript",
    "Vue JS",
    "CSS",
    "Javascript",
    "Vue JS",
  ];

  const [activeElement, setActiveElement] = useState();
  const navigate=useNavigate();

  const handleCategoryNav=(e)=>{
    navigate(`/category/${(e.target.innerText).toLowerCase()}`)
  }

  return (
    <CategoryList>
      <Categorys>
        {keywords.map((value, i) => (
          <Category onClick={handleCategoryNav} key={i}>{value}</Category>
        ))}
      </Categorys>
    </CategoryList>
  );
};

export default CategoriesTab;
