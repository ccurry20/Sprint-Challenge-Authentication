const db = require("../database/dbConfig.js");
const Users = require("../jokes/jokes-model.js");

describe("authentication", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("Register", () => {
    test("adds user to db", async () => {
      let users;
      users = await db("users");
      expect(users).toHaveLength(0);

      await Users.add({ id: 1, username: "Carmen", password: "lambda1" });
      await Users.add({ id: 2, username: "Elise", password: "lambda2" });

      users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("Login", () => {
    test("checks db for new user", async () => {
      let user;

      await Users.add({ id: 1, username: "Elliot", password: "lambda3" });

      user = await db("users");
      user = await Jokes.findById(1);

      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("password");
    });
  });
});
