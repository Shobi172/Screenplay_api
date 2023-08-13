# Screenplay API


A backend API for managing characters, relations, and properties in a screenplay.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Reports](#reports)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

The Screenplay API provides endpoints to manage characters, relations between characters, properties associated with characters, and user authentication. It's designed to support a screenplay creation application where users can organize characters and their relationships.

## Features

- Create, read, update, and delete characters.
- Define relations between characters.
- Add properties to characters.
- User authentication using JWT.
- API documentation using Swagger.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running instance or connection URI)

### Installation

1. Clone the repository:


   git clone https://github.com/Shobi172/Screenplay_api.git

   cd Screenplay_api


2. Install dependencies: 

   `npm install`


3. Create a `.env` file in the project root directory and set the following environment variables:


   PORT=5000

   MONGODB_URI=your-mongodb-connection-uri

   JWT_SECRET=your-jwt-secret

   CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name

   CLOUDINARY_API_KEY = your-cloudinary-api-key

   CLOUDINARY_API_SECRET = your-cloudinary-api-secret

4. Start the server:

   `npm start`



## Usage

1. Access the API at `http://localhost:5000`.
2. Use API endpoints to manage characters, relations, properties, and authentication.
3. API documentation is available at `http://localhost:5000/api-docs`.


## Reports

You can generate and download reports in different formats for the characters in the screenplay:

- **PDF Report**: Access the PDF report at `http://localhost:5000/api/reports/pdf`.
- **Excel CSV Report**: Access the Excel CSV report at `http://localhost:5000/api/reports/excel-csv`.

Each report includes the following information for each character:

- Name
- Age
- Gender
- Occupation
- Relations
- Photos



## API Documentation

The API documentation is generated using Swagger. You can access the Swagger UI by visiting `http://localhost:5000/api-docs`.


## Testing

The project uses Jest for testing. To run tests, use the following command:

`npm test`



## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make your changes.
4. Commit and push your changes to your forked repository.
5. Create a pull request to the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests.
