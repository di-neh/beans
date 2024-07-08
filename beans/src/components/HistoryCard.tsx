import React from 'react';
import styled from "styled-components";

interface IHistory{
    date: string;
    text: string;
}

const Card = styled.div` 
    width: 150px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    background: rgb(81, 80, 89);
    border-radius: 10px;
    flex: 1 1  calc(20% - 10px);
    max-width: calc(25% - 10px);
    margin: 25px;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover{
        border: 1px solid purple;
    }
    
`
const HistoryCard: React.FC<IHistory> = ({date, text}) => {
    return (
        <Card>
            <div>{date}</div>
            <div>{text}</div>
        </Card>
    );
};

export default HistoryCard;