let base_URL = "https://pokeapi.co/api/v2/pokemon/";

function getPokemonList(url) {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      let pokemon = data.results;

      let container = document.querySelector(".pokemon-list-container");

      container.innerHTML = "";

      pokemon.forEach((btn) => {
        container.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });

      container.innerHTML += `<br><br><button onclick = "getPokemonList('${data.next}')">Next</button>`;
      container.innerHTML += `<br><br><button onclick = "getPokemonList('${data.previous}')">Back</button>`;
    });
}

getPokemonList(base_URL);

function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes throufg
      console.log(data);
      fetch(data.species.url)
        .then((res) => res.json())
        .then((speciesData) => {
          console.log(speciesData);
          // Write data to pokemon information container
          document.querySelector(".details").innerHTML = `
    <p>${speciesData.flavor_text_entries[1].flavor_text}</p>
    `;
        });
      document.querySelector(".pokemon-info").innerHTML = `<img src="${
        data.sprites.front_default
      } ">
      ${"Name: " + data.species.name} <br> ${"Height: " + data.height} <br> ${
        "Weight: " + data.weight + "kg's"
      } <br> ${"Details:"}`;
    });
}
