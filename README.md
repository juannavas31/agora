# Agora Project
This is a prototype of the proposal to apply Blockchain to UN Sustainable Development Goal 5, [Gender Equality](https://www.un.org/development/desa/disabilities/envision2030-goal5.html). 
In particular, with SDS 5.5: 
>Ensure women’s full and effective participation and equal opportunities for leadership at all levels of decision making in political, economic and public life.

It was presented in the Challenge day, in [Blockchain Convergence Congress (Malaga)](https://blockchainconvergence.com/global-blockchain-challenge/). 

The proposal is also in line with new regulation for 2020, where big companies must include social reporting in the annual reports, including gender equality indicators. 

##Description

The company must enroll to be able to report indicators about total executives and women executives at the top 3 levels of management. 
Out of those indicators, Key Performing Indicators are calculated and according to KPIs levels, tokens are granted to the company as a reward. The tokens can be traded later by other benefits with other companies or public institutions in this system.

##Implementation

The prototype is implemented by several smart contracts in Solidity (Ethereum) and a web app based on React. 

##How to Run it 
You need node v10, truffle and ganache installed on your machine. 
Run ganache. 
Download the repository and run 
```
npm install
truffle migrate
``` 
From truffle migrate log, copy the contract address for Factory contract. 
Replace that address in file ethereum/factory.js 

Then run 
```
npm run dev
```

Finally, open a web browser and enter url: localhost:3000 

Enjoy! 



