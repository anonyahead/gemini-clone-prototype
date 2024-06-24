import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPrompt,
  } = useContext(Context);
  const [showSendIcon, setShowSendIcon] = useState(false);

  useEffect(() => {
    const handleShowSendIcon = () => {
      if (input.trim().length > 0 && !loading) {
        setShowSendIcon(true);
      } else {
        setShowSendIcon(false);
      }
    };

    handleShowSendIcon();
  }, [input, loading]);

  const handleCardClick = async (query) => {
    setRecentPrompt(query);
    setInput(query);
    await onSent(query);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,Alan.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Suggest the best parks to visit in a city with descriptions"
                  )
                }
              >
                <p>
                  Suggest the best parks to visit in a city with descriptions
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Explain how something works like an engineer"
                  )
                }
              >
                <p>Explain how something works like an engineer</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("What is the best game to play 2024?")
                }
              >
                <p>What is the best game to play 2024?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("How to build frontend using React ?")
                }
              >
                <p>How to build frontend using React ?</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {showSendIcon && !loading ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send"
                />
              ) : loading && !resultData ? (
                <img src={assets.pause_icon} alt="Pause" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people,so
            double-check its responses.{" "}
            <span className="small-note">Your privacy and Gemini Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
