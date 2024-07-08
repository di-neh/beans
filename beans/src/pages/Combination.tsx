import React, {useEffect, useState} from "react";
import styled from "styled-components";
import HistoryCard from "../components/HistoryCard.tsx";

const Wrapper = styled.div`
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Conteiner = styled.div` 
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    
`
const Title = styled.h1` 
    text-align: center;
`

const Combination: React.FC = () => {
    const [combos, setCombo] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://jellybellywikiapi.onrender.com/api/combinations?pageSize=100`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('bad request');
                }
                return response.json();
            })
            .then((data) => {
                console.log("API response:", data);
                if (data.items && Array.isArray(data.items)) {
                    setCombo([...combos, ...data.items]);
                } else {
                    throw new Error('Response does not contain an array of items');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading){
        return (
            <div>
                Загрузка...
            </div>
        )
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <Wrapper>
            <Title>
                Комбинации
            </Title>
            <Conteiner>
                {combos.map((combo) => (
                    <HistoryCard
                        key={combo.combinationId}
                        date={combo.name}
                        text={combo.tag[0]}
                    />
                ))}
            </Conteiner>
        </Wrapper>
    );
};

export default Combination;