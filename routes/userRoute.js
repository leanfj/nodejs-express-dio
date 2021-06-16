const fs = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "user.json");

const getUsers = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
};

const userRoute = (app) => {
  app
    .route("/users/:id?")
    .get((request, response) => {
      const users = getUsers();
      response.send({ users });
    })
    .post((request, response) => {
      const users = getUsers();
      users.push(request.body);
      saveUsers(users);
      response.status(201).send("Ok Usuário inserido!");
    })
    .put((request, response) => {
      const users = getUsers();
      saveUsers(
        users.map((user) => {
          if (user.id === request.params.id) {
            return {
              ...user,
              ...request.body,
            };
          }

          return user;
        })
      );

      response.status(201).send("Ok, usuário atualizado!");
    })
    .delete((request, response) => {
      const users = getUsers();

      saveUsers(users.filter((user) => user.id !== request.params.id));

      response.status(200).send("Ok, usuário removido!");
    });
};

module.exports = userRoute;
