# 🛍️ ShopHub - Ecommerce App

Welcome to the MERN eCommerce App! This is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The app provides an online platform for users to browse, shop, and purchase products.


## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Demo

![App Screenshot](/Demo/screencapture-localhost-8080-2023-08-31-11_22_28.png)
![App Screenshot](/Demo/screencapture-localhost-8080-products-all-2023-08-31-01_55_23.png)
![App Screenshot](/Demo/screencapture-localhost-8080-product-64ea195895b40bb81cd544d8-2023-08-31-01_55_52.png)


## 🎯 Features

- User authentication and registration
- Product browsing and searching
- Product details with images, descriptions, and prices
- Shopping cart functionality
- Secure checkout process
- User profile management
- Admin panel for managing products and orders



## 🎯 Installation

- Clone the repository:

   ```bash
   git clone https://github.com/ArnabMukherjee03/ecommerce
   
   ```
-  Install server dependencies:
   ```bash
   cd ecommerce
   ```
   ```bash
   cd server
   npm install
   ```
- Create a .env file in the project directory with the following environment variables:
```bash
PORT = 8080
MONGO_URI = your-mongodb-connection-uri
TOKEN_SECRET = your-jwt-secret
```
- Navigate to the client directory:
```bash
cd ..
cd client
```
-   Install client dependencies:
```bash
npm install
```

## 🚀 Usage
- Visit http://localhost:3000 in your browser to access the client application.
- Visit http://localhost:8080 in your browser to access the server API.


## 💻 Tech Stack

**Client:** 
- **React**: Frontend library for building user interfaces.
- **Redux**: Redux for state Management
- **Tailwind Css**: For Styling

**Server:** 
- **Node.js**: Runtime environment for server-side code.
- **MongoDB**: Database for storing product and user data.


## 🍿 Demo

- *Project will deploy soon*

## 🙌 Contributing

Contributions are welcome! If you find any issues or want to enhance the app, feel free to submit a pull request.

Fork the repository.
Create a new branch.
Make your changes and commit them.
Push your changes to your forked repository.
Submit a pull request to the main repository.

## 🚀 Future Upgradation
- Admin Page
- Payment Gateway
- order sucess page
