import React from 'react';
import { ReactNode } from 'react';
import './App.css';
import Sound from 'react-sound';
import Forge from './images/Forge.png'
import ForgeHover from './images/Forge-Hover.png'
import Reactor from './images/Reactor.png'
import ReactorHover from './images/Reactor-Hover.png'
import bigShop from './images/shop.jpg'
import shop from './images/Shop.png'
import shopBurned from './images/Shop-Burned.png'
import shopHover from './images/Shop-Hover.png'
import { Frame, useMotionValue, useTransform } from "framer-motion"


import { useCallback, useEffect, useState } from "react";

import {
  Box,
  Flex,
  Image,
  Hide,
  Button,
  Center,
  Container,
  useColorModeValue,
  Fade,
  useDisclosure,
} from "@chakra-ui/react";

import {
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesH3,
  ServicesP,
  Btn,
  BtnLink,
  BtnButNotButton,
  BtnWrapper,
  Credits,
  CreditsLink,
  Credits2,
  ServicesP2,
} from './Elements';

import { 
  requestAccount,
  getAccount, 
  checkIfPaused,
  getTotalSupply,
  mintToken,
  mintFreeToken,
} from './web3Stuff.js'

let bg = "/Background2.png";
console.log("https://quaktown.notion.site/Welcome-to-Quaktown-477b14acf36849428e9312082147ba89");


function App() {

  const MAXSUPPLY = 6666;
  const AMOUNTFREE = 6666;
  const MAXPERTX = 1;
  const MAXPERTXFREE = 1;
  const COSTINETH = 0;

  
  const [walletAddress, setWalletAddress] = useState("");

  const [saleStatus, setSaleStatus] = useState(true);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const [freeMintActive, setFreeMintActive] = useState(true);
  const [isSoldOut, setisSoldOut] = useState(false);

  const [isHoveringMansion, setIsHoveredMansion] = useState(false);
  const [isHoveringBoat, setIsHoveredBoat] = useState(false);
  const [isMintPanelOpen, setIsMintPanelOpen] = useState(false);
  const [isCreditPanelOpen, setIsCreditPanelOpen] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const { isOpen, onToggle } = useDisclosure();

  const [isMuted, setIsMuted] = useState(true);

  const onMouseEnterMansion = () => setIsHoveredMansion(true);
  const onMouseLeaveMansion = () => setIsHoveredMansion(false);

  const onMouseEnterBoat = () => setIsHoveredBoat(true);
  const onMouseLeaveBoat = () => setIsHoveredBoat(false);

  const onMintPageOpen = () => {
    updateStuff();
    if ( isMintPanelOpen == true) {
      setIsMintPanelOpen(false);
      bg = "/Background2.png";
    } else {
    setIsCreditPanelOpen(false);
    setIsInfoPanelOpen(false);
    setIsMintPanelOpen(true);
    bg = "/Background4.png";
    }
  };

  const onCreditPageOpen = () => {
    updateStuff();
    setIsMintPanelOpen(false);
    setIsInfoPanelOpen(false);
    if ( isCreditPanelOpen == true) {
      setIsCreditPanelOpen(false);
      bg = "/Background2.png";
    } else {
    setIsCreditPanelOpen(true);
    bg = "/Background4.png";
    }
  };

  const onInfoPanelOpen = () => {
    updateStuff();
    setIsMintPanelOpen(false);
    setIsCreditPanelOpen(false);
    if ( isInfoPanelOpen == true) {
      setIsInfoPanelOpen(false);
      bg = "/Background2.png";
    } else {
      setIsInfoPanelOpen(true);
    bg = "/Background4.png";
    }
  };

  const decrementMintAmount = () => {
    updateStuff();
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    updateStuff();
    let newMintAmount = mintAmount + 1;
    if (freeMintActive) {
      if (newMintAmount > MAXPERTXFREE) {
        newMintAmount = MAXPERTXFREE;
      }
      setMintAmount(newMintAmount);
    } else {
      if (newMintAmount > MAXPERTX) {
        newMintAmount = MAXPERTX;
      }
      setMintAmount(newMintAmount);
    }
    
  };

  const enter = () => {
    onToggle();
    setIsMuted(false);
    getAccount().then(value => {
      setWalletAddress(value);
    }).catch((err) => {
      console.log(err);
    })
    checkIfPaused().then(value => {
      setSaleStatus(value);
      console.log(value);
    }).catch((err) => {
      console.log(err);
    })
    getTotalSupply().then(value => {
      setTotalSupply(value);
      if (value >= AMOUNTFREE) {
        setFreeMintActive(true);
      }
      if (value >= MAXSUPPLY) {
        setisSoldOut(true);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const updateConnected = () => {
    requestAccount().then(value => {
      getAccount().then(value => {
        setWalletAddress(value);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  const mint = (mintAmount) => {
    updateStuff();
    mintToken(mintAmount).then(tx => {
      console.log(tx);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  /*
  const stake = () => {
    updateStuff();
    claim(claimAmount).then(tx => {
      console.log(tx);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  */

  /*
  const mutate = () => {
    updateStuff();
    mutateMally(token).then(tx => {
      console.log(tx);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  */


  const freeMint = (mintAmount) => {
    updateStuff();
    mintFreeToken(mintAmount).then(tx => {
      console.log(tx);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const updateStuff = () => {
    getAccount().then(value => {
      setWalletAddress(value);
    }).catch((err) => {
      console.log(err);
    })
    checkIfPaused().then(value => {
      setSaleStatus(value);
      console.log(value);
    }).catch((err) => {
      console.log(err);
    })
    getTotalSupply().then(value => {
      setTotalSupply(value);
      if (value >= AMOUNTFREE) {
        setFreeMintActive(false);
      }
      if (value >= MAXSUPPLY) {
        setisSoldOut(true);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const openOpensea = () => {
    window.open("https://opensea.io/");
  }

  const openLicense = () => {
    window.open("https://creativecommons.org/publicdomain/zero/1.0/");
  }

  /*
  const openCommunity = () => {
    window.open("https://discord.gg/");
  }*/

  /*
  const openShop = () => {
    window.open(";
  }*/

  return (
    <Container>
    <Box
        position="absolute"
        backgroundImage={'url("/Background3.png")'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        display="flex"
        flex="1"
        width="100vw"
        height="100vh"
        zIndex="-1"
      >
      {isOpen ? (
        <Fade in={isOpen}>
    <Box
        backgroundImage={bg}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        display="flex"
        flex="1"
        width="100vw"
        height="100vh"
      >
        {!isMuted ? (
        <Sound
      url="music.mp3"
      playStatus={Sound.status.PLAYING}
      loop={true}
      volume={20}/>
        ) : (
          <Box />
        )}
        {isCreditPanelOpen ? (
          <Box
          backgroundImage='url("/boarder2.png")'
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="500px"
          display="flex"
          flex="1"
          >
            <ServicesWrapper>
            <ServicesCard>
              <Box
                position="relative"
                top="-75px"
                right="-200px"
                marginBottom="-50px"
              >
               <Btn>
                  <Image src={("/x.png")}
                  onClick={() => onCreditPageOpen()} 
                  cursor="pointer"/>
                </Btn>
              </Box>
              <ServicesCard>
                <Credits2>Drawn by a quakhead.</Credits2>
                <Credits2>Developed by a quakhead.</Credits2>
                <Credits2>More info soon maybe.</Credits2>
                <Credits2>
                  <pre>                  -Anon</pre>
                </Credits2>
              </ServicesCard>
              <ServicesCard>
                <Credits2>Music:</Credits2>
                <Credits>Adventure by Alexander Nakarada</Credits>
                <CreditsLink>serpentsoundstudios.com</CreditsLink>
                <Credits>Music promoted by</Credits>
                <CreditsLink>hosic.com/free-music/all/</CreditsLink>
                <Credits>Attribution 4.0 International (CC BY 4.0)</Credits>
                <CreditsLink>creativecommons.org/licenses/by/4.0</CreditsLink>
              </ServicesCard>
            </ServicesCard>
          </ServicesWrapper>
          </Box>
        ) : (
          <Box/>
        )}
        {isInfoPanelOpen ? (
          <Box
          backgroundImage='url("/boarder4.png")'
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="500px"
          display="flex"
          flex="1"
          >
            <ServicesWrapper>
            <ServicesCard>
              <Box
                position="relative"
                top="-350px"
                right="-220px"
                marginBottom="-80px"
              >
               <Btn>
                  <Image src={("/x.png")}
                  onClick={() => onInfoPanelOpen()} 
                  cursor="pointer"/>
                </Btn>
              </Box>
            </ServicesCard>
          </ServicesWrapper>
          </Box>
        ) : (
          <Box/>
        )}
        {isMintPanelOpen ? (
          <Box
          backgroundImage='url("/boarder.png")'
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="500px"
          display="flex"
          flex="1"

        >
          <ServicesWrapper>
            <ServicesCard>
            <Box
              position="relative"
              top="-150px"
              right="-200px"
              marginBottom="-80px"
            >
             <Btn>
                <Image src={("/x.png")}
                onClick={() => onMintPageOpen()} 
                cursor="pointer"/>
              </Btn>
            </Box>
            <ServicesH2>FREE MINT</ServicesH2>
            <ServicesP2>(just pay gas)</ServicesP2>
            <ServicesH2>1 Per Wallet</ServicesH2>
            <ServicesP>{totalSupply}/{MAXSUPPLY} Minted </ServicesP>
              {!saleStatus ? (
                <div>
                {!isSoldOut ? (
                  <div>
                  {!freeMintActive ? (
                    <div>
                      <BtnWrapper>
                        <Btn>
                          <Image src={("/left.png")}onClick={() => decrementMintAmount()}
                          cursor="pointer"/>
                        </Btn>
                        <BtnButNotButton>{mintAmount}</BtnButNotButton>
                        <Btn>
                          <Image src={("/right.png")}onClick={() => incrementMintAmount()}
                          cursor="pointer"/>
                        </Btn>
                      </BtnWrapper>
                      <Btn>
                          <BtnLink onClick={() => mint(mintAmount)}>Mint ({parseFloat(mintAmount * COSTINETH).toFixed(3)})</BtnLink>
                      </Btn>
                    </div>
                  ) : (
                    <div>
                    <BtnWrapper>
                      <Btn>
                        {/*<img src={("/left.png")}onClick={() => decrementMintAmount()} 
                        cursor="pointer"/>
                      </Btn>
                      <BtnButNotButton>{mintAmount}</BtnButNotButton>
                      <Btn>
                        <img src={("/right.png")}onClick={() => incrementMintAmount()} 
                        cursor="pointer"/>*/}
                      </Btn>
                    </BtnWrapper>
                    <Btn>
                        <BtnLink onClick={() => freeMint(mintAmount)}>Free Mint</BtnLink>
                    </Btn>
                    </div>
                  )}
                </div>
                ) : (
                  <div>
                    <Btn>
                      <BtnButNotButton>Sold Out</BtnButNotButton>
                    </Btn>
                  </div>
                )}
                </div>
              ) : (
                <Btn>
                  <BtnButNotButton>Not Live</BtnButNotButton>
                </Btn>
              )}
            </ServicesCard>
            <ServicesCard>
              <Image src={("/cc0.png")}
              onClick={openLicense}
              cursor="pointer"
              width="100px"/>
            </ServicesCard>
          </ServicesWrapper>
          </Box>
        ) : (
          <Box />
        )}
        
        <Button
          onClick={updateConnected}
          fontFamily="'Montserrat Alternates', sans-serif"
          cursor="pointer"
          position="absolute"
          top="32px"
          right="32px"
          display="flex"
          backgroundColor="rgba(247, 152, 36, 1)"
          alignItems="center"
          justifyContent="center"
          padding="8px 20px"
          border="2px solid"
          boxShadow="1px 3px 0"
          borderRadius="12px"
          willChange="transform"
          transition="transform 50ms"
          fontSize={["14px", "16px"]}
          _active={{
            backgroundColor: "rgba(247, 152, 36, 1)",
            transform: "translateY(3px)",
            boxShadow: "1px 0px 0",
          }}
          _hover={{
            backgroundColor: "rgba(247, 152, 36, 1)",
            transform: "translateY(1px)",
            boxShadow: "1px 2px 0",
          }}
        >
          {walletAddress}
          {!walletAddress && <>Connect</>}
          </Button>
        <Box
          position="absolute"
          bottom="32px"
          right="32px"
        >
          {isMuted ? (
            <Image src={("/muted.png")} onClick={() => setIsMuted(false)} 
            cursor="pointer"/>
          ) : (
            <Image src={("/unmuted.png")} onClick={() => setIsMuted(true)} 
            cursor="pointer"/>
          )}
        </Box>
        <Box
          position="absolute"
          bottom="32px"
          left="32px"
        >
            <Image src={("/scroll.png")} onClick={() => onCreditPageOpen()} 
            cursor="pointer"/>
        </Box>
        <Box
          position="absolute"
          bottom="32px"
          left="150px"
        >
            <Image src={("/info.png")} onClick={() => onInfoPanelOpen()} 
            cursor="pointer"/>
        </Box>
        {!isMintPanelOpen ? (
          <Container>
          {!isCreditPanelOpen ? (
            <Container>
              {!isInfoPanelOpen ? (
                <Container>
                  <Box flexDirection="column" overflow="hidden">
                    <Flex
                      h="28vh"
                      w="80vw"
                      justifyContent="space-around"
                      mt={{ "2xl": "9vh", base: "6vh" }}
                    >
                    </Flex>
                    <Flex w="64.9vw" justifyContent="flex-end">
                      <Flex
                        width={{ "2xl": "47%", base: "50%" }}
                        justifyContent="space-between"
                        mr={{ "2xl": 20, xl: 2 }}
                      >
                        <Box
                          onMouseEnter={onMouseEnterMansion}
                          onMouseLeave={onMouseLeaveMansion}
                          onClick={onMintPageOpen}
                        >
                          {isHoveringMansion ? (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Mansion-Hover.png"
                              alt="MansionHover"
                            />
                          ) : (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Mansion.png"
                              alt="ShopMansion"
                            />
                          )}
                        </Box>
                        <Hide below="lg">
                        </Hide>
                      </Flex>
                          
                    {/*<Flex w="64.9vw" justifyContent="flex-end">
                      <Flex
                        width={{ "2xl": "47%", base: "50%" }}
                        justifyContent="space-between"
                        mr={{ "2xl": 20, xl: 2 }}
                      >
                        <Box
                          onMouseEnter={onMouseEnterReactor}
                          onMouseLeave={onMouseLeaveReactor}
                          onClick={onReactorPageOpen}
                        >
                          {isHoveringReactor ? (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              onClick={openMutateMally()}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Reactor-Hover.png"
                              alt="ReactorHover"
                            />
                          ) : (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Reactor.png"
                              alt="Reactor"
                            />
                          )}
                        </Box>
                        <Hide below="lg">
                        </Hide>
                      </Flex>*/}

                      {/*<Flex w="64.9vw" justifyContent="flex-end">
                      <Flex
                        width={{ "2xl": "47%", base: "50%" }}
                        justifyContent="space-between"
                        mr={{ "2xl": 20, xl: 2 }}
                      >
                        <Box
                          onMouseEnter={onMouseEnterShop}
                          onMouseLeave={onMouseLeaveShop}
                          onClick={onReactorPageOpen}
                        >
                          {isHoveringShop ? (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Shop-Hover.png"
                              alt="ShopHover"
                            />
                          ) : (
                            <Image
                              boxSize={{ "2xl": "300px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Shop.png"
                              alt="Shop"
                            />
                          )}
                        </Box>
                        <Hide below="lg">
                        </Hide>
                      </Flex>*/}

                    </Flex>
                    <Flex w="100vw" justifyContent="center">
                      <Flex
                        w={{ xl: "70%", md: "90%", base: "74%" }}
                        justifyContent="space-between"
                      >
                        <Hide below="lg">
                        </Hide>
                      </Flex>
                    </Flex>
                    <Flex
                      h="8vh"
                      w="80vw"
                      justifyContent="space-around"
                      mt={{ "2xl": "9vh", base: "6vh" }}
                    >
                    </Flex>
                    <Flex w="42vw" justifyContent="center">
                      <Flex
                        w={{ xl: "70%", md: "90%", base: "74%" }}
                        justifyContent="space-between"
                      >
                        <Box
                          onMouseEnter={onMouseEnterBoat}
                          onMouseLeave={onMouseLeaveBoat}
                          onClick={openOpensea}
                        >
                          {isHoveringBoat ? (
                            <Image
                              boxSize={{ "2xl": "330px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Boat-Hover.png"
                              alt="BoatHover"
                            />
                          ) : (
                            <Image
                              boxSize={{ "2xl": "330px" }}
                              cursor="pointer"
                              objectFit="contain"
                              src="/Boat.png"
                              alt="Boat"
                            />
                          )}
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Container>
                ) : (
                  <Box />
                )}
                </Container>
              ) : (
                <Box />
              )}
            </Container>
        ) : (
          <Box />
        )}
      </Box>
      </Fade>
        ) : (
          
      <Button
          onClick={enter}
          fontFamily="'Montserrat Alternates', sans-serif"
          position="absolute"
          top="45%"
          right="46.8%"
          display="flex"
          backgroundColor="rgba(247, 152, 36, 1)"
          alignItems="center"
          justifyContent="center"
          padding="8px 20px"
          border="2px solid"
          boxShadow="1px 3px 0"
          borderRadius="12px"
          willChange="transform"
          transition="transform 50ms"
          fontSize={["14px", "16px"]}
          _active={{
            backgroundColor: "rgba(247, 152, 36, 1)",
            transform: "translateY(3px)",
            boxShadow: "1px 0px 0",
          }}
          _hover={{
            backgroundColor: "rgba(247, 152, 36, 1)",
            transform: "translateY(1px)",
            boxShadow: "1px 2px 0",
          }}
        >Enter</Button>
          
        )}
      </Box>
      </Container>
  );
}

export default App;
