let currentPageUrl = "https://swapi.dev/api/people/";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Error loading cards");
  }

  async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "";

    try {
      response = await fetch(url);
      responseJson = await response.json();
      responseJson.results.forEach((character) => {
        const card = document.createElement("div");
        card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/1.jpg')`;
        card.className = "cards";

        characterNameBG = document.createElement("div");
        characterNameBG.className = "character-name-bg";

        characterName = document.createElement("span");
        characterName.className = "character-name";
        characterName.innerText = `${character.name}`;

        characterNameBG.appendChild(characterName);
        card.appendChild(characterNameBG);
        mainContent.appendChild(card);
      });
      currentPageUrl = url;
    } catch (error) {
      alert("Error loading characters");
      console.log(error);
    }
  }
};
