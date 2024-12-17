import React from "react";

const Footer = () => {
  return (
    <div>
      <footer>
        <div
          style={{
            backgroundColor: "aliceblue",
            fontSize: "smaller",
            height: "100%",
            paddingRight: "5%",
            paddingLeft: "5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-start">
            © 2023 Copyright:
            <a
              className="text-dark ps-2"
              target="_blank"
              href="https://www.santhoshavidhyalaya.com/"
            >
              santhoshavidhyalaya
            </a>
          </div>
          <div>VERSION 1.0.0</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
