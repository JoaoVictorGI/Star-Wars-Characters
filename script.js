let currentPageUrl = "https://swapi.dev/api/people/";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Error loading cards");
  }

  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");

  nextButton.addEventListener("click", loadNextPage);
  backButton.addEventListener("click", loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try {
    response = await fetch(url);
    responseJson = await response.json();
    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
        /\D/g,
        ""
      )}.jpg')`;
      card.className = "cards";

      characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`.toLowerCase();

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(
          /\D/g,
          ""
        )}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `name: ${character.name}`.toLowerCase();

        const characterHeight = document.createElement("span");
        characterHeight.className = "character-details";
        characterHeight.innerText = `height: ${convertHeight(
          character.height
        )}m`;

        const characterMass = document.createElement("span");
        characterMass.className = "character-details";
        characterMass.innerText = `mass: ${character.mass}kg`;

        const characterEyeColor = document.createElement("span");
        characterEyeColor.className = "character-details";
        characterEyeColor.innerText = `eye color: ${character.eye_color}`;

        const characterBirthYear = document.createElement("span");
        characterBirthYear.className = "character-details";
        characterBirthYear.innerText =
          `birth year: ${character.birth_year}`.toLowerCase();

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterHeight);
        modalContent.appendChild(characterMass);
        modalContent.appendChild(characterEyeColor);
        modalContent.appendChild(characterBirthYear);
      };

      mainContent.appendChild(card);
    });

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    alert("Error loading characters");
    console.log(error);
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Error loading next page");
  }
}

async function loadPreviousPage() {
  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert("Error loading previous page");
  }
}

function hideModal() {
  const modal = document.getElementById("modal");

  modal.style.visibility = "hidden";
}

function convertHeight(height) {
  if (height !== "unknown") {
    return (height / 100).toFixed(2);
  }
}
