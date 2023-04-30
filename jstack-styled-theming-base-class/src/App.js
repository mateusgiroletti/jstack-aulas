import React, { Component } from 'react';

import { ThemeProvider } from "styled-components";

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

import themes from './styles/themes';

class App extends Component {
    state = {
        theme: 'dark',
    };

    handleToggleTheme = () => {
        this.setState(prevState => ({
            theme: prevState.theme === 'dark' ? 'light' : 'dark',
        }));

        // Força o update do render() quando não existe alteração de estado
        // this.forceUpdate();
    }

    render() {
        const { theme } = this.state;

        return (
            <ThemeProvider theme={themes[theme] || themes.dark}>
                <GlobalStyle />
                <Layout
                    onToggleTheme={this.handleToggleTheme}
                    selectedTheme={theme}
                />
            </ThemeProvider>
        );
    }
}

export default App;
