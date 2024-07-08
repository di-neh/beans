import styled from "styled-components";
import {Link, Outlet} from "react-router-dom";
import React from "react";


const Header = styled.header`
    display: flex;
    box-sizing: border-box;
    padding: 10px 35%;
    justify-content: center;
    background: white;
`
const Container = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
const PageNames = styled(Link)`
    display: flex;
    cursor: pointer;
    padding: 10px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease, background-color 0.3s ease;
    text-decoration: none; 
    color: black; 
    border-radius: 3rem;
    font-size: 22px;

    &:hover {
        border: 1px solid purple;
        
    }
`
const Main = styled.main`
    flex: 1;
    overflow: auto; 
`;

const Layout:React.FC = () => {
    return (
        <>
            <Header>
                <Container>
                    <PageNames to="/">Бобы</PageNames>
                    <PageNames to="/facts">Факты</PageNames>
                    <PageNames to="/recipes">Рецепты</PageNames>
                    <PageNames to="/combo">Комбинации</PageNames>
                    <PageNames to="/history">История</PageNames>
                </Container>
            </Header>
            <Main>
                <Outlet />
            </Main>
        </>
    );
}

export default Layout;
