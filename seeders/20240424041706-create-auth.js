"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Auths", [
      {
        userId: 1,
        password:
          "$2a$12$jTcPHgy9OSDypLfBNn0ya.5YrYo4VOPmmCOZVaEAnEVL11XNMJBKW",
        email: "JohnDoe@example.com",
        createdAt: "2023-06-28T09:25:00Z",
        updatedAt: "2023-06-28T09:25:00Z",
      },
      {
        userId: 2,
        password:
          "$2a$12$StV5U0uaDkYqrnFacotXXOxqx7zkn4cN3/k.CQ0HFAryuX9pTwqs2",
        email: "JaneSmith@example.com",
        createdAt: "2023-06-29T07:30:00Z",
        updatedAt: "2023-06-29T07:30:00Z",
      },
      {
        userId: 3,
        password:
          "$2a$12$TOSVtTbNfeBChZuK3hujUO/vYD9CZybnRjlCXbBIx2q2MGnV.k/DO",
        email: "MichaelJohnson@example.com",
        createdAt: "2023-06-30T10:45:00Z",
        updatedAt: "2023-06-30T10:45:00Z",
      },
      {
        userId: 4,
        password:
          "$2a$12$9/fgZWCCLDlljb2MbzcDU.UBGgB/9k.fQGyiimFGvDC5bU2eK.9MO",
        email: "EmilyBrown@example.com",
        createdAt: "2023-07-01T08:15:00Z",
        updatedAt: "2023-07-01T08:15:00Z",
      },
      {
        userId: 5,
        password:
          "$2a$12$4pYRhoTqtYWyLXQxKfq9..mnjO3ZA8OKEwTN93ukVdw5v3L93syze",
        email: "DavidWilson@example.com",
        createdAt: "2023-07-02T11:00:00Z",
        updatedAt: "2023-07-02T11:00:00Z",
      },
      {
        userId: 6,
        password:
          "$2a$12$/Dchn0B1iRJzoiuslBY/Q.ynJGVbA85HchjbK4TRAx5EwHgVQUbeO",
        email: "OliviaTaylor@example.com",
        createdAt: "2023-07-03T09:30:00Z",
        updatedAt: "2023-07-03T09:30:00Z",
      },
      {
        userId: 7,
        password:
          "$2a$12$lDfPok89wv97DeU/xqGGf.84joTAwaPpoVNjWJUo5A8YYcEHManqG",
        email: "JamesBrown@example.com",
        createdAt: "2023-07-04T10:45:00Z",
        updatedAt: "2023-07-04T10:45:00Z",
      },
      {
        userId: 8,
        password:
          "$2a$12$Og0RDRsEc4BakFrOpN5gNuwKRXVkPHz2lg0tZNy7v8cXQo7fmP9C6",
        email: "EmmaMartinez@example.com",
        createdAt: "2023-07-05T11:15:00Z",
        updatedAt: "2023-07-05T11:15:00Z",
      },
      {
        userId: 9,
        password:
          "$2a$12$90uHCodI6r3QRyZ8Bc1zJuyusCYCB3O6sqUOvvoAgpPelr9149xTK",
        email: "NoahAnderson@example.com",
        createdAt: "2023-07-06T08:30:00Z",
        updatedAt: "2023-07-06T08:30:00Z",
      },
      {
        userId: 10,
        password:
          "$2a$12$BY6BoWoBJsTV7yZLwf0i9OZjAVsk4hnYaGDU4rxBsWlcJhq8zTEBO",
        email: "SophiaWilson@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
      {
        userId: 11,
        password:
          "$2a$12$kFcLCrxSij6WwA4ZH76/xuCu8jxFX0sz3tR4ALKwFDETEEkhytzy.",
        email: "mhdrizki@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
      {
        userId: 12,
        password:
          "$2a$12$HrODaq02h3jnH9RsI.KChOatNZdNwn7WVCEBZc5Xqs0OxMl7WDikS",
        email: "rizkiyogamauludin@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
      {
        userId: 13,
        password:
          "$2a$12$6RUObAogD2CUMDZ/LUnH4OGdEHWg3RZYGBCtMedfqxOomYTN5R/a2",
        email: "rayhanhafa@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
      {
        userId: 14,
        password:
          "$2a$12$r2eHsn/0djul2dmuQpJStO8ilsiUVX.fHySbEvl2jk9YjKbTLLJcW",
        email: "maulanategar@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
      {
        userId: 15,
        password:
          "$2a$12$ijh0KPu53WKqVLuNIpl88ebEDDMm97WFiFzfa/x9wsJcBS5q463i2",
        email: "rafi@example.com",
        createdAt: "2023-07-07T09:00:00Z",
        updatedAt: "2023-07-07T09:00:00Z",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
