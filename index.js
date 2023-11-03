const EVENTS_URI = " https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/recipes";

const state = {
  events: [],
};

const partiesList = document.querySelector("#displat-parties");
// Get Events
const getParties = async () => {
  try {
    const response = await fetch(EVENTS_URI);
    const json = await response.json();
    const parties = json.data;
    return parties;

    if (json.error) {
      throw new Error(json.error);
    }
    state.events = parties
  } catch (error) {
    console.error(error);
  }
};

// Post Events
const createParty = async (name,description,unformattedDate,location) => {
  try {
    const date = new date(unformattedDate).toISOString();
    const response = await fetch(EVENTS_URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, date, location }),
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }init();
  } catch (error) {
    console.error(error)
  }
};

const form = document.querySelector('form');
form.addEventListener ("submit", (evt)=>{
    const formEL = evt.target;
    evt.preventDefault();
    createParty(
        formEL.title.vaule,
        formEL.description.vaule,
        formEL.data.vaule,
        formEL.location,vaule
    );

    formEL.title.vaule = ""
    formEL.description.vaule = ""
    formEL.data.vaule= ""
    formEL.location,vaule = ""

    formEL.title.focus();
})

//Delete Events

const deleteParty = async (id) => {
  try {
    const response = await fetch(EVENTS_URI + "/" + id, { method: "DELETE" });
    const json = response.json();
    const parties = json.data;
    return parties;

    if (json.error) {
      throw new Error(json.error);
    }
    state.events = parties
  } catch (error) {
    console.error(error);
  }
};

function renderEvents() {
  if (!state.events || state.events.len) {
    partiesElement;
    partiesElement.innerHTML = `<li>no Events found</li>`;
    return;
  }
  const partyItems = state.events.map((party) => {
    const partyItems = document.createElement("li");
    partyItems.classList.add("party");
    partyItem.innerHTML = `
            <h2>${party.name}</h2>
            <p>${party.description}</p>
            <p>${party.date}</p>
            <p>${party.location}</p>
            `;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    partyItem.append(deleteButton);
    deleteButton.addEventListener("click", () => deleteParty(party.id));
    return partyItems;
  });

  partiesList.replaceChildren(...partyItems);
}

const init = async () => {
  const parties = await getParties();
  renderEvents();
};

init();
