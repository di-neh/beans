import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    color: white;
    margin-top: 20px;
`;
const Conteiner = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
`

const RecipeInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://jellybellywikiapi.onrender.com/api/recipes/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Bad request");
                    }
                    return response.json();
                })
                .then((data) => {
                    setRecipe(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Wrapper>
            <Conteiner>
                <h1>{recipe.name}</h1>
                <div>{recipe.description}l</div>
                <div>
                    <div>Total time: {recipe.totalTime} </div>
                    <div>Recipe makes {recipe.makingAmount} </div>
                </div>
                    <img src={recipe.imageUrl} width={480} height={455}/>
                <div>
                    <h3>Ingredients</h3>
                    <p>{recipe.ingredients}</p>
                </div>
                <div>
                    <h3>Direction</h3>
                    <p>{recipe.directions}</p>
                </div>
            </Conteiner>
        </Wrapper>
    );
};

export default RecipeInfo;
