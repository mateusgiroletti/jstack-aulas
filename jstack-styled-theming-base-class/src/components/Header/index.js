import React, { Component } from 'react';

import PropTypes from "prop-types";

import { Container } from './styles';

export default class Header extends Component {
    static propTypes = {
        selectedTheme: PropTypes.string.isRequerid,
        selectedTheme: PropTypes.func.isRequerid,
    };

    render() {
        const { onToggleTheme, selectedTheme } = this.props;

        return (
            <Container>
                <h1>JStack's Blog</h1>
                <button
                    type="button"
                    onClick={onToggleTheme}
                >
                    {selectedTheme === 'dark' ? '🌞' : '🌚'}
                </button>

                {/* <button onClick={handleNavigate} style={{ color: '#fff' }}>Navegar</button> */}
            </Container>
        );
    }
}