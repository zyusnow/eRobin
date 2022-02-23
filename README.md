# eRobin

## eRobin at a Glance

eRobin is a full stack web app that uses Flask/Python on the backend and React/Javascript on the front. eRobin utilizes YH Finance, Alpha Vantage Api, Finnhub news Api to render stock infomation like historical charts, relevant news, company data. It was built within two weeks as part of the App Academy bootcamp.

eRobin is inspired by Robinhood that help user make investment easier. Logged in users build a personalized portfolio with the ability to manage watchlists and holdings using real-time data. Users can also search stocks to add to their customized watchlists or make fake transactions. Notice: eRobin is only for developing purposes. 

## Demo 
Live Link: https://erobin.herokuapp.com/

## Technologies and Libraries
- Backend: Flask/Python/PostgreSQL
- Frontend: React.js/Redux.js
- [Recharts](http://recharts.org/en-US/)
- [YH Finance](https://rapidapi.com/apidojo/api/yh-finance)
- [Alpha Vantage](https://rapidapi.com/alphavantage/api/alpha-vantage)

## Frontend Overview

eRobin does the vast majority of its application logic on the backend, but display/interaction logic on the frontend is managed using several technologies.

### Landing page
![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645568409/CleanShot_2022-02-22_at_14.19.11_2x_px2abv.png)
![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645568422/CleanShot_2022-02-22_at_14.19.46_2x_vjjms7.png)
![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645568418/CleanShot_2022-02-22_at_14.19.28_2x_xhd2n3.png)

### Portfolio Page
Users can view gain/loss via portfolio page. They can also manage watchlist on this page as well.
![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645600979/CleanShot_2022-02-22_at_23.18.59_v3ylsz.gif)


### Stock Page
Users can make transactions on this page. Buying power and owned shares are both shown dynamically. Users selling more than they owned or buying stocks beyond buying power are both having dynamic error handlings.

![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645567982/CleanShot_2022-02-22_at_14.10.46_mgobkz.gif)

### Search
Users can dynamically search for stocks and companies to make investments. The navigation search bar element gets reused. The suggestion logic performed when typing make sure that exact matches title or company appear at the top.

![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645567617/CleanShot_2022-02-22_at_14.05.31_ek6nrf.gif)


### Transaction Page
![](https://res.cloudinary.com/dprnsux1z/image/upload/v1645568179/CleanShot_2022-02-22_at_14.15.38_2x_d5ne5m.png)



## What's next?
Since this is a two-week capstone project, some features are nice to have later:
- Dark mode vs Light mode can be a good feature for user to have.
