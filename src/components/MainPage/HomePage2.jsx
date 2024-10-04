import { Avatar, Button, Drawer, Modal, Select, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  useGetCryptoHistoryQuery,
  useGetCryptoQuery,
} from "../../CryptoApi/Api";
import CoinHistory from "./CoinHistory";
import ColumnChart from "./ColumnChart";
import SiderBar from "../SiderBar";
import { AuthContext } from "../../Context/contextApi";
import RealTinePrice from "./RealTinePrice";
import CryptoCurrencies from "./CryptoCurrencies";
import MarketUpdate from "./MarketUpdate";
import { AlignRightOutlined } from "@ant-design/icons";

const HomePage2 = ({
  connectWallet,
  account,
  Balance,
  switchingNetwork,
  network,
}) => {
  const [filteredCoins, setfilteredCoins] = useState([]);
  const { currentUser, FilterFxn, handleLogout } = useContext(AuthContext);
  const [timeperiod, setTimeperiod] = useState("7d");
  const [coinId, setcoinId] = useState("Qwsogvtv82FCd");
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading: isCryptoLoading } = useGetCryptoQuery();
  const { data: coinHistory, isLoading: isHistoryLoading } =
    useGetCryptoHistoryQuery({
      coinId,
      timeperiod,
    });
  const isLoading = isCryptoLoading || isHistoryLoading;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showWalletModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const Arr = FilterFxn(data?.data?.coins);
    setfilteredCoins(Arr);
  }, [data]);

  return (
    <div className="Mainbox h-screen flex w-full text-white overflow-hidden ">
      {/* Left Sidebar */}
      <SiderBar switchingNetwork={switchingNetwork} network={network} />

      {/* Main Content (Scrollable) */}
      <div className="flex-1 w-1/2 overflow-y-auto p-6">
        <section className="">
          <div className="flex justify-between">
            <p className="text-6xl">
              Welcome,<b> {currentUser.displayName.split(" ")[0]}</b>
            </p>
            <div className="flex flex-col gap-4 items-end">
              <button
                className="p-1 bg-gray-500 rounded-md w-16 md:hidden"
                onClick={showDrawer}
              >
                <AlignRightOutlined />
              </button>
              <p className="">
                {network ? `Conneted to ${network}` : "Not Connected"}
              </p>
              {account ? (
                <button className="bg-gradient-to-r from-[#8456af] to-[#37cdbb] text-white  py-2 px-4 rounded-lg">
                  {account.slice(0, 6) + "..." + account.slice(38, 42)}
                </button>
              ) : (
                <Button type="primary" onClick={showWalletModal}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
          <div className="mt-3">
            <b className="text-xl text-slate-400 ">Current Balance</b>
            <br />{" "}
            <b className="text-5xl ">
              {Math.round(Balance * 100) / 100}{" "}
              {network === "SEPOLIA" ? "sepETH" : "ETH"}
            </b>
          </div>
          <div className="flex gap-6 mt-14 mb-5">
            <Select
              defaultValue="BTC"
              className="w-40 "
              placeholder="Select coin"
              onChange={(value) => setcoinId(value)}
            >
              {filteredCoins?.map((coin) => (
                <Option key={coin.uuid} value={coin.uuid}>
                  <Avatar shape="square" size="small" src={coin.iconUrl} />
                  <b>{coin.symbol}</b>
                </Option>
              ))}
            </Select>

            <Select
              defaultValue="7d"
              className="w-40"
              placeholder="Select Timeperiod"
              onChange={(value) => setTimeperiod(value)}
            >
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
          </div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div className="md:hidden">
                <RealTinePrice CoinArray={filteredCoins} coinId={coinId} />
              </div>
              <div className="h-1/2 mt-6">
                <CoinHistory
                  coinHistory={coinHistory}
                  CoinArray={filteredCoins}
                  coinId={coinId}
                />
              </div>
            </>
          )}
        </section>
        <section className="">
          <p className="text-xl ">Top CryptoCurrencies in The World</p>
          {isLoading ? (
            <Skeleton />
          ) : (
            <CryptoCurrencies CoinArray={filteredCoins} />
          )}
        </section>
        <section className="w-full mt-5 flex flex-col p-1 overflow-auto overflow-y-auto mb-4">
          <p className="text-xl">Real Time Market Update</p>
          {isLoading ? (
            <Skeleton />
          ) : (
            <MarketUpdate CoinArray={filteredCoins} simplified />
          )}
        </section>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 p-5 overflow-y-auto bg-black flex-col justify-between hidden md:flex">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 mb-7">
            <Avatar
              style={{ backgroundColor: "orange", verticalAlign: "middle" }}
              size="large"
            >
              {currentUser.displayName[0]}
            </Avatar>
            <b className="text-sm">{currentUser.displayName.split(" ")[0]}</b>
          </div>
          <p className="text-sm text-gray-500">{currentUser.email}</p>
        </div>
        <p className="text-xl mb-5 text-gray-400">RealTime Coin Price</p>
        {isLoading ? (
          <Skeleton />
        ) : (
          <RealTinePrice CoinArray={filteredCoins} coinId={coinId} />
        )}
        <div className="text-xl text-slate-500">Global Stats</div>
        {isLoading ? <Skeleton /> : <ColumnChart coinData={filteredCoins} />}
      </div>

      {/*Drwaer for sm devices*/}
      <Drawer title="CryptoBox" onClose={onClose} open={open}>
        <div className="flex flex-col h-full justify-between">
          {/* Profile Section */}
          <div>
            <p className="text-2xl mb-4">Profile</p>
            <div className="flex items-center gap-2 mb-2">
              <Avatar
                style={{ backgroundColor: "orange", verticalAlign: "middle" }}
                size="large"
              >
                {currentUser.displayName[0]}
              </Avatar>
              <b className="text-sm">{currentUser.displayName}</b>
            </div>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
            {account ? (
              <p className="mt-3 text-xl">
                <b>MetaMask Account address:- </b> {account}
              </p>
            ) : (
              "Metamask not connected"
            )}{" "}
            <br />
            <button
              onClick={() => {
                if (network === "SEPOLIA") {
                  switchingNetwork("ETH");
                } else {
                  switchingNetwork("sepETH");
                }
              }}
              className="p-2 bg-teal-400 rounded-md mt-3"
            >
              Switch Network
            </button>
          </div>

          {/* Logout Button at the bottom */}
          <div className="mb-4" onClick={handleLogout}>
            <button className="p-2 bg-slate-300 text-black text-xl rounded-md w-full">
              Logout
            </button>
          </div>
        </div>
      </Drawer>

      {/* Modal */}
      <Modal
        title="Connect Wallet"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => connectWallet("metamask")}
        >
          Connect MetaMask
        </Button>
        <Button type="primary" onClick={() => connectWallet("coinbase")}>
          Connect Coinbase Wallet
        </Button>
      </Modal>
    </div>
  );
};

export default HomePage2;
