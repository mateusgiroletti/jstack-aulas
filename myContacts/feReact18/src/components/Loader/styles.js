import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const fadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

export const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(246,245,252,0.7);
    backdrop-filter: blur(5px);
    animation: ${fadeIn} 0.3s;

    ${({ isLeaving }) => isLeaving && css`animation ${fadeOut} 0.2s forwards`};

`;


