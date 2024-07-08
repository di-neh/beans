import React, {useEffect, useState} from "react";
import styled from "styled-components";
import BobCard from "../components/BobCard.tsx";

const Wrapper = styled.div`
    color: white;
    height: 100%;
`
const Conteiner = styled.div` 
    display: flex;
    flex-wrap: wrap;
    padding: 10px 3%;
`
const Title = styled.h1` 
    text-align: center;
`

const Beans: React.FC = () => {
    const [beans, setBeans] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currenPage, setCurrentPage] = useState<number>(1);
    const [fetching, setFetching] = useState(true);

useEffect(() => {
    if(fetching){
        fetch(`https://jellybellywikiapi.onrender.com/api/beans?pageIndex=${currenPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('bad request');
                }
                return response.json();
            })
            .then((data) => {
                console.log("API response:", data);
                if (data.items && Array.isArray(data.items)) {
                    setBeans([...beans, ...data.items]);
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
                Все бобы
            </Title>
            <Conteiner>
                {beans.map((bean) => (
                    <BobCard
                        key={bean.beanId}
                        id={bean.beanId}
                        name={bean.flavorName}
                        description={bean.description}
                        pic={bean.imageUrl}
                    />
                ))}
            </Conteiner>
        </Wrapper>
    );
};

export default Beans;