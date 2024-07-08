import React from 'react';
import styled from "styled-components";

interface IFact{
    id: number;
    title: string;
    text: string;
}

const Card = styled.div` 
    width: 300px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    background: rgb(81, 80, 89);
    border-radius: 10px;
    flex: 1 1  calc(33% - 10px);
    max-width: calc(33% - 10px);
    margin: 25px;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover{
        border: 1px solid purple;
    }
    
`
const FactCard: React.FC<IFact> = ({id, text, title}) => {
    return (
        <Card>
            <div>{id}. {title}</div>
            <div>{text}</div>
        </Card>
    );
};

export default FactCard;