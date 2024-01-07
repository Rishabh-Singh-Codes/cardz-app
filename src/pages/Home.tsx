import Card from "../components/Card";
import Navbar from "../components/Navbar";
import cardList from "../mock-data/cardList.json";
import ComponentMenu from "../components/ComponentMenu";
import { useEffect, useState } from "react";
import Splash from "./Splash";
import backBtn from "../assets/backBtn.svg";
import CardDetails from "./CardDetails";

const Home = () => {
  const totalBalance = cardList.data.reduce((acc, curr) => {
    acc += Number(curr.balance.split("$")[1].split(",").join(""));
    return acc;
  }, 0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: any;

    timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [vertical, setVertical] = useState(true);
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const [showDetails, setShowDetails] = useState(false);

  const rotateCard = (index: number | null) => {
    if (selectedCard === null) {
      setSelectedCard(index);
      setVertical(false);
      setTimeout(() => {
        setShowDetails(!showDetails);
      }, 500);
    } else if (selectedCard === index) {
      setSelectedCard(null);
      setVertical(true);
      setTimeout(() => {
        setShowDetails(!showDetails);
      }, 0);
    } else {
      setSelectedCard(index);
      setVertical(false);
    }
  };

  return (
    <>
      {isLoading === false ? (
        <div className="flex flex-col h-full py-2 mt-3">
          {vertical ? (
            <div className="flex-grow pt-20 md:pt-4 px-4">
              <ComponentMenu title="Bank Cards" />
              <div className="flex flex-col">
                <div className="text-lg md:text-sm text-white/60">Balance</div>
                <div className="text-2xl md:text-xl text-white">
                  ${totalBalance}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow mt-1">
              <div
                onClick={() => rotateCard(selectedCard)}
                className="px-8 md:px-4"
              >
                <img src={backBtn} alt="Home" className="mb-4" />
                {selectedCard !== null && (
                  <div className="text-white text-3xl w-1/3 mb-3">
                    {cardList.data[selectedCard].cardName}
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            className={`flex ${
              vertical
                ? "pl-24 md:pl-12 flex-row h-[600px]"
                : `h-[800px] px-8 md:px-4 ${
                    showDetails ? "flex-col" : "flex-row"
                  }`
            } overflow-x-scroll transition-all duration-500 overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
          >
            {cardList.data.map((card, index) => (
              <div
                className={`
                ${
                  vertical === true && selectedCard === null
                    ? "-rotate-90 -mr-28"
                    : ""
                } ${
                  vertical === false && selectedCard === index
                    ? ""
                    : "-rotate-90"
                }
                  ${
                    vertical === false && selectedCard !== index ? "hidden" : ""
                  }
                    transition-all duration-500`}
                onClick={() => vertical === true && rotateCard(index)}
                key={index}
              >
                <Card
                  cardData={card}
                  position={selectedCard === index ? "horizontal" : "vertical"}
                />
              </div>
            ))}
            {selectedCard !== null && vertical === false && showDetails && (
              <CardDetails balance={cardList.data[selectedCard].balance} />
            )}
          </div>
          <Navbar />
        </div>
      ) : (
        <Splash />
      )}
    </>
  );
};

export default Home;
