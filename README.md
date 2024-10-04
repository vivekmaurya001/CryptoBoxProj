# CryptoBox

**CryptoBox** is a real-time cryptocurrency price tracking platform where users can connect their MetaMask or Coinbase Wallet, view their wallet address, and check their balance. The platform provides real-time market prices, historical data for up to 5 years, top cryptocurrencies, and allows users to compare token prices on a comprehensive dashboard.

## Tech Stack

1. **Firebase**: For easy authentication, Google sign-in, and scalability.
2. **Vite**: A modern front-end tool for fast development using React.
3. **Tailwind CSS**: For styling components in just a few lines of code.
4. **Ant Design**: Prebuilt components for UI.
5. **Chainlink**: To fetch real-time price feeds.
6. **Coinranking API**: To fetch historical data of coins, including market cap and market share.
7. **Redux Toolkit**: For managing API calls and fetching data efficiently.
8. **Highcharts**: For rendering interactive, animated data visualizations.
9. **Ethers.js**: For connecting to MetaMask wallet and fetching balance.
10. **Coinbase Wallet SDK**: For connecting to Coinbase Wallet.

## Features

1. **Email/Password and Google Signup**
   - Users can sign up or log in using their email or Google account.
   
2. **Wallet Connection**
   - Users can connect either MetaMask or Coinbase Wallet, and the platform displays the wallet address and balance. The site also responds to network changes or address changes in real-time.

3. **Real-time Price Feed**
   - Users can choose from a variety of coins to view real-time prices, historical data, and compare prices with other coins.

4. **Network Switching (Testnet and Mainnet)**
   - Easy switching between test networks and main networks for testing and live usage.

5. **Fully Responsive Design**
   - The platform adjusts its components to fit all screen sizes.

## Implementation

1. **Signup and Login**
   - Once a user signs in, their information is stored in the database and reflected on the dashboard. The user only needs to use email and password for future logins.

2. **Wallet Connection**
   - MetaMask integration uses `ethers.js` to fetch the user's wallet address and balance, responding to any network or address change.
   - Coinbase integration uses `coinbase-sdk` with an Infura project ID to connect and interact with the wallet.

3. **Price Feed**
   - Real-time price data is fetched using Chainlink scripts deployed on the Optimism Mainnet with an Infura project ID.
   - Historical data is retrieved from the Coinranking API for price history and other coin details.
  
   ![Architecture](https://freeimage.host/i/db6YqNV)

## Challenges Faced

1. **Firebase Integration**
   - Several errors were encountered while setting up Firebase and connecting the sign-in and login process with Google.

2. **Fetching Wallet Balance**
   - Initially, fetching the balance of testnet networks like Sepolia was problematic. This was resolved by adding a network-switching mechanism.

3. **Fetching Price Feed Data**
   - Several issues were encountered while trying to fetch data from Chainlink. It was later discovered that the contract address of the coins deployed on a particular mainnet, along with the mainnet ID, was required.

4. **Graphing Issues**
   - Graphs disappeared when null values were present in the data. This was resolved by filtering the data before plotting.

## Links

- **Deployed Site**: [https://crypto-box01.vercel.app](#)
- **Video Demo**: [Insert Video Link Here](#)

