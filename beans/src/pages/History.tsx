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

const History: React.FC = () => {
    const [hists, setHists] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`https://jellybellywikiapi.onrender.com/api/mileStones?pageSize=100`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('bad request');
                }
                return response.json();
            })
            .then((data) => {
                console.log("API response:", data);
                if (data.items && Array.isArray(data.items)) {
                    setHists([...hists, ...data.items]);
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
                История
            </Title>
            <Conteiner>
                {hists.map((hists) => (
                    <HistoryCard
                        key={hists.mileStoneId}
                        date={hists.year}
                        text={hists.description}
                    />
                ))}
            </Conteiner>
        </Wrapper>
    );
};

export default History;