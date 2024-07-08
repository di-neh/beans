import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    box-sizing: border-box;
    padding: 20px 10%;
    color: white;
    display: flex;
    flex-direction: column;
    
`;
const TopBox = styled.div `
    display: flex;
`
const Box = styled.div` 
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
`
const BotBox = styled.div `
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const BeanDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bean, setBean] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://jellybellywikiapi.onrender.com/api/beans/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Bad request");
                    }
                    return response.json();
                })
                .then((data) => {
                    setBean(data);
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
            <TopBox>
                <div>
                    <h1>{bean.flavorName}</h1>
                    <p>{bean.description}</p>
                    <img src={bean.imageUrl} alt={bean.flavorName} width={480} height={310}/>
                </div>
                <Box>
                    <p>Group Name:</p>
                    <p>{bean.groupName}</p>
                    <p>Ingredients:</p>
                    <p>{bean.ingredients}</p>
                </Box>
            </TopBox>
            <BotBox>
                <div>
                    <p>Color Group:</p>
                    <p>{bean.colorGroup}</p>
                </div>
                <div>
                    <p>Hexadecimal Color:</p>
                    <p>{bean.backgroundColor}</p>
                </div>
                <div>
                    <p>Bean ID:</p>
                    <p>{bean.beanId}</p>
                </div>
                <div>
                    <p>Kosher:</p>
                    <p>{bean.kosher ? 'yes' : 'no'}</p>
                </div>
                <div>
                    <p>Seasonal:</p>
                    <p>{bean.seasonal ? 'yes' : 'no'}</p>
                </div>
                <div>
                    <p>Gluten Free:</p>
                    <p>{bean.glutenFree ? 'yes' : 'no'}</p>
                </div>
                <div>
                    <p>Sugar Free:</p>
                    <p>{bean.sugarFree ? 'yes' : 'no'}</p>
                </div>
            </BotBox>
        </Wrapper>
    );
};

export default BeanDetails;
