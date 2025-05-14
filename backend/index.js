import express from "express";

const app = express();
const port = 3000;
app.use(express.json());
let teaData = [];
let teaID = 1;

//adding
app.post("/teas", (req, res) => {
  let teaprice = req.body.price;
  let teaname = req.body.name;
  let tea = { id: teaID++, teaname, teaprice };
  teaData.push(tea);
  res.send(tea);
});

//listing all
app.get("/teas", (req, res) => {
  res.send(teaData);
});

//specific listing
app.get("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("No Tea Found");
  } else {
    res.send(teaData[index]);
  }
});

//updating
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("No such tea found to update");
  } else {
    const newteaname = req.body.name;
    const newprice = req.body.price;
    tea.teaname = newteaname;
    tea.teaprice = newprice;
    res.status(200).send(tea);
  }
});

//deleting
app.delete("/teas/:id", (req, res) => {
  const indextoremove = teaData.findIndex(
    (tea) => tea.id === parseInt(req.params.id)
  );
  if (indextoremove === -1) {
    return res.status(404).send("No such tea found to delete");
  } else {
    teaData.splice(indextoremove, 1);
    res.status(200).send("Tea is removed!");
  }
});

app.listen(port, () => {
  console.log(`The server is running on port : ${port}...`);
});
