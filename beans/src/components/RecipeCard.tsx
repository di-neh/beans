import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

interface IRecipe{
    id?: number;
    name: string;
    text: string;
    makingAmount: string;
    time: string;
}

const Card = styled.div` 
    width: 150px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
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

const RecipeCard: React.FC<IRecipe> = ({name, text, makingAmount, time, id}) => {
    return (
        <Card>
            <h1>{name}</h1>
            <div>{text}</div>
            <div>
                <div>{makingAmount}</div>
                <div>{time}</div>
            </div>
            <Link to={`/recipes/${id}`}>check out this recipe</Link>
        </Card>
    );
};

export default RecipeCard;