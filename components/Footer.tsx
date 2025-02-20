import React from "react";
import { GithubIcon, InstagramIcon } from "lucide-react";
const Footer = () => {
  return (
    <footer className="border-t border-indigo-200   text-gray-700  md:mt-4  ">
      <div className="flex gap-5 justify-center mt-5 mb-3 ">
        <p>Made by Imad Uddin </p>
        <div className="icons flex gap-5">
          <a href="https://instagram.com/imaduddin_101" target="blank">
            {" "}
            <InstagramIcon className="icon" />
          </a>
          <a href="https://github.com/imad-101" target="blank">
            {" "}
            <GithubIcon className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
