import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

interface IBobCard{
    id?: number;
    name: string;
    description: string;
    pic: string;
}
const Wrapper = styled.div`
    display: flex;
    background: rgb(81, 80, 89);
    width: 600px;
    height: 220px;
    border-radius: 10px;
    flex: 1 1 calc(33.333% - 10px);
    max-width: calc(33.333% - 10px);
    margin: 5px;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    
    &:hover{
        border: 1px solid purple;
    }
`

const Conteiner = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
    align-items: center;
    margin-top: 20px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit; 
`;

const BobCard: React.FC<IBobCard> = ({name, description, pic, id}) => {

    return (
        <Wrapper>
            <div>
                <img src={pic}  alt={''} height={185} width={290}/>
            </div>
            <Conteiner>
                <StyledLink to={`/beans/${id}`}>
                    <div style={{color:'purple', fontSize:'x-large'}}>
                        {name}
                    </div>
                </StyledLink>
                <div>
                {description}
                </div>
            </Conteiner>
        </Wrapper>
    );
};

export default BobCard;