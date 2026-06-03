import React from 'react';
import styled from 'styled-components';

// 💡 Pass toggle or setOpen down as a prop
const ToggleMenu = ({ open, toggle }) => {
  return (
    <StyledWrapper $isOpen={open}>
      {/* 💡 Change tag to 'div' or use onClick to trigger state change */}
      <div className="hamburger" onClick={toggle}>
        <input 
          type="checkbox" 
          checked={open} 
          readOnly 
        />
        <svg viewBox="0 0 32 32">
          <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    display: inline-block; /* Ensures the click target area wraps the SVG perfectly */
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: 2.7em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'none'};
  }

  .line {
    fill: none;
    stroke: black;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: ${props => props.$isOpen ? '20 300' : '12 63'};
    stroke-dashoffset: ${props => props.$isOpen ? '-32.42' : '0'};
  }
`;

export default ToggleMenu;