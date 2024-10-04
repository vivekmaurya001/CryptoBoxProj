import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { Avatar, Button, Image, Tooltip } from "antd";
import { AuthContext } from "../Context/contextApi";
import {
  BranchesOutlined,
  CodeSandboxOutlined,
  LogoutOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

const SiderBar = ({ account, setAccount, switchingNetwork, network }) => {
  const [actAddress, setactAddress] = useState(0);
  const { handleLogout } = useContext(AuthContext);

  const connectHandler = async () => {
    if (window.ethereum !== "undefined") {
      const account1 = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setactAddress(ethers.getAddress(account1[0]));
      setAccount(account1[0]);
    } else {
      alert("Please install metamask");
    }
  };

  return (
    <div className="w-24 p-2 bg-black flex-col justify-between h-full hidden md:flex">
      <img
        src="images/cryptocurrency.png"
        alt="Your Site Logo"
        className="w-16 cursor-pointer h-auto mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
      />
      <ul className="flex flex-col gap-4 flex-grow justify-center">
        <Tooltip placement="right" color={"teal"} title={"Stats"}>
          <button className="p-2 bg-slate-200  rounded-md text-black">
            <SlidersOutlined
              style={{
                fontSize: "32px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip placement="right" color={"teal"} title={"Cryptos"}>
          <button className="p-2 bg-slate-200  rounded-md text-black">
            <CodeSandboxOutlined
              style={{
                fontSize: "32px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip placement="right" color={"teal"} title={"Switch Network"}>
          <button
            onClick={() => {
              if (network === "SEPOLIA") {
                switchingNetwork("ETH");
              } else {
                switchingNetwork("sepETH");
              }
            }}
            className="p-2 bg-slate-200  rounded-md text-black"
          >
            <BranchesOutlined
              style={{
                fontSize: "32px",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip placement="right" color={"teal"} title={"Logout"}>
          <button
            onClick={handleLogout}
            className="p-2 bg-slate-200  rounded-md text-black"
          >
            <LogoutOutlined
              style={{
                fontSize: "32px",
              }}
            />
          </button>
        </Tooltip>
        {/* <Button className="w-full h-10">Connect</Button> */}
        {/* <Button className="w-full h-10" onClick={handleLogout}>Logout</Button> */}
      </ul>
    </div>
  );
};

export default SiderBar;
