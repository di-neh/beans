import React, {useEffect, useState} from "react";
import styled from "styled-components";
import FactCard from "../components/FactCard.tsx";

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
    margin-left: 20%;
    
`
const Title = styled.h1` 
    text-align: center;
`

const Facts: React.FC = () => {
    const [facts, setFacts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currenPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if(fetching){
            fetch(`https://jellybellywikiapi.onrender.com/api/facts?pageIndex=${currenPage}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('bad request');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("API response:", data);
                    if (data.items && Array.isArray(data.items)) {
                        setFacts([...facts, ...data.items]);
                        setCurrentPage(prevState => prevState + 1)

                    } else {
                        throw new Error('Response does not contain an array of items');
                    }
                    setLoading(false);
                })
                .finally(
                    () => setFetching(false)
                )
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    const scrollHandler = (e:any) => {
        if(e.target.documentElement.scrollHeight -(e.target.documentElement.scrollTop + window.innerHeight) < 100){
            setFetching(true)
        }
    }

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
                Факты
            </Title>
            <Conteiner>
                {facts.map((fact) => (
                    <FactCard
                        key={fact.factId}
                        id={fact.factId}
                        title={fact.title}
                        text={fact.description}
                    />
                ))}
            </Conteiner>
        </Wrapper>
    );
};

export default Facts;