import React from 'react';

import { BrowserRouter, Link } from 'react-router-dom';

import Routes from '../../Routes';
import Header from '../Header';
import Footer from '../Footer';

import { Nav } from "./styles"

export default function Layout({ onToggleTheme, selectedTheme }) {
    return (
        <BrowserRouter>
            <Header
                onToggleTheme={onToggleTheme}
                selectedTheme={selectedTheme}
            />
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/posts/123456">Post</Link>
            </Nav>
            <Routes />
            <Footer
                onToggleTheme={onToggleTheme}
                selectedTheme={selectedTheme}
            />
        </BrowserRouter>
    );
}
