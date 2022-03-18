require("dotenv").config();
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    numero: "001",
    nome: "Bulbasaur",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    altura: "0.7",
    peso: "6.9",
    categoria: "Seed",
    habilidade: "Overgrow",
  },

  {
    id: 2,
    numero: "004",
    nome: "Charmander",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    altura: "0.6",
    peso: "8.5",
    categoria: "Lizard",
    habilidade: "Blaze",
  },

  {
    id: 3,
    numero: "007",
    nome: "Squirtle",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    altura: "0.5",
    peso: "9.0",
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },
];

let pokemon = undefined;

app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro", { pokedex, pokemon });
});

app.get("/detalhes", (req, res) => {
  res.render("detalhes", { pokedex, pokemon });
});

app.get("/pokemon/:id", (req, res) => {
  const escolhido = +req.params.id;
  pokemon = pokedex.find(pokemon => pokemon.id === escolhido);
  res.render("pokemon", { pokedex, pokemon });
});

app.post("/cadastro", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete pokedex[id];
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
