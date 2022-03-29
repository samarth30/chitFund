# Chit Fund - a decentralized system for group loans

## Demo Link

You can see a live demo here https://chitfund.netlify.app/

## Table of Content:

- [About The App](#about-the-app)
- [Homepage Screenshots](#screenshots)
- [Manager contract for chitfund] (#manager-contract-for-chitfund)
- [Chitfund factory contract for new funds] (#chitfund-factory-contract-for-new-funds)
- [Technologies](#technologies)
- [Project Setup](#setup)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App

Chitfund project is an application that acts as a financial instrument for saving and borrowing money. It lets you contribute certain amount of crypto currency to a pool where members can borrow and save and can be treated as a source of funds for emergency and differnet purposes.

## Homepage Screenshots

<img src="https://raw.githubusercontent.com/samarth30/chitFund/V1.0/Screenshot%20from%202020-12-05%2006-50-44.png"/>

## Manager contract for chitfund

<img src="https://raw.githubusercontent.com/samarth30/chitFund/V1.0/Screenshot%20from%202020-12-05%2006-50-52.png"/>

## Chitfund factory contract for new funds

<img src="https://raw.githubusercontent.com/samarth30/chitFund/V1.0/Screenshot%20from%202020-12-05%2006-51-06.png"/>

## Technologies

The applciaiton is built on NodeJs + React using smart contracts and web3 on the ethereum blockchain.

## Project Setup

#### System prerequisits

    Git, Nvm (used for installing nodejs)
    (On Windows, all of these commands should be run from an admin elevated terminal, you can use chocolatey on windows or homebrew on mac to install them.)

    For windows, might need to install C++ packages and download nvm installer.
    C++ link: https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools
    nvm installer link: https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip

    Run the following command on command line

        nvm install 16.9.0
        nvm use 16.9.0
        node --version

#### Application server/UI running guide

1. Clone this repo to your local machine.
2. cd into the project, and into the /app directory.
   example for windows: PS C:\Users\you\ICS-690-ETH\chitFund\app> pwd
   C:\Users\you\ICS-690-ETH\chitFund\app
3. run ( in admin terminal on Windows, mac should be fine using default)
   npm install
4. run (assuming there were no hard errors above, though there will be lots of warnings, they can be ignored)
   npm start
5. The server will start and should open the UI in your browser

- In case of errors in 4, run following commands before npm install:
  1. npm i --package-lock-only
  2. npm audit fix
  3. npm cache clean --force

#### Deploying smart contracts to rinkeby testnet

Connecting metamask, deploying contract on testnet, and testing application functionality

Prerequisites

1. Install metamask https://metamask.io/
2. Configure metamask on testnet https://devtonight.com/posts/metamask-testnet-wallet-setup-for-blockchain-development#:~:text=Add%20Custom%20Testnet%20Networks%20To,%2C%20RPC%20URL%2C%20chain%20ID
3. collect some eth in your metamask wallet via a faucet https://faucets.chain.link/rinkeby

#### Deployment instructions

1. Checkout the branch with the config changes to deploy on rinkeby
2. Create an infura account https://infura.io/
3. Create a new infura project
4. Get a rinkeby testnet endpoint from project page
5. Create a file called .env inside of the root of the project ( it will be ignored by git and not tracked)
6. Inside that file insert the following
   MNEMONIC="your metamask recovery phrases goes here"
   RINKEBY_INFURA="infura_endpoint_goes_here"
   (The mnemonic is the 12 word recovery phrase for your metamask wallet)
7. Change the values inside of /migrations/2_deploy_chitfund.js to suit your needs
8. Delete the old contract .json files under the contracts folders under chitfund/app/src/contracts
   This will allow you to do a fresh deploy with no history
   you will need to add + commit + push those files
9. Once you have that set up, run the following commands under root directory (Example: C:\Users\you\ICS-690-ETH\chitFund)
   npm install
   npx truffle compile
   npx truffle migrate --network rinkeby

Then run "npm start" and you should now have your own copy of the contracts deployed!

## Status

The current project has the chitfund fully functional with Capitalization and Migration contracts added.
