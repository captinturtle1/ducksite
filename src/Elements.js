import styled from 'styled-components';



export const backgroundImage = styled.div`
  background-repeat: no-repeat;
  background-size: auto;
`;

export const ServicesWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  display: grid;
  align-items: center;
  grid-gap: 64px;
  padding: 50px 50px;
  

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const ServicesCard = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0px;
  max-height: 800px;
  padding: 5px;
`;

export const ServicesIcon = styled.img`
  padding-top: 0px;
  height: 50px;
  width: 100px;
  margin-bottom: 0px;
`;

export const ServicesH3 = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.3rem;
  color: #000;
`;

export const ServicesH2 = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 2rem;
  color: #000;
  text-shadow: 1.5px 1.5px 5px #fff;
  margin-bottom: 0px;
`;

export const Credits = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1rem;
  color: #fff;
  text-shadow: 1.5px 1.5px 5px #000;
  margin-bottom: 0px;
`;

export const Credits2 = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1.7rem;
  color: #fff;
  text-shadow: 1.5px 1.5px 5px #000;
  margin-bottom: 0px;
`;

export const CreditsLink = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: .8rem;
  color: #808080;
  text-shadow: 1.5px 1.5px 5px #000;
  margin-bottom: 0px;
`;

export const ServicesP = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 2rem;
  color: #000;
  text-shadow: 1px 1px 5px #fff;
  text-align: center;
`;

export const ServicesP2 = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 1rem;
  color: #000;
  text-shadow: 1.5px 1.5px 5px #fff;
  margin-bottom: 0px;
`;

export const Btn = styled.nav`
  font-family: 'Montserrat Alternates', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnLink = styled.nav`
  border-radius: 50px;
  background: #000;
  white-space: nowrap;
  padding: 20px 40px;
  color: #fff;
  font-size: 26px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #444444;
  }
`;

export const BtnButNotButton = styled.div`
  font-family: 'Montserrat Alternates', sans-serif;
  background: #000;
  white-space: nowrap;
  padding: 10px 22px;
  color: #f3f6f4;
  font-size: 2rem;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-align: center;
`;

export const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 15px;
`;