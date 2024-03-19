// Fonction pour récupérer les informations sur le pays en fonction du nom du pays
const fetchCountryInfo = async (countryName) => {
    const response = await fetch(`/api/country?name=${countryName}`);
    return response.json();
};

// Fonction pour récupérer les informations sur les devises en fonction de la devise de pays
const fetchCurrencyInfo = async (currency) => {
    const response = await fetch(`/api/convert?base=${currency}`);
    return response.json();
};

document.addEventListener('DOMContentLoaded', async () => {
    const countryInput = document.getElementById('country-input');
    const projectsListElement = document.getElementById('projects-list');
    const projectPanelElement = document.getElementById('project-panel');
    const submitButton = document.getElementById('submit-btn');

    // Mise à jour de la liste des projets
    const updateProjectsList = async () => {
        const countryName = countryInput.value; // Obtenez la valeur du champ de saisie de pays

        const countryInfo = await fetchCountryInfo(countryName);
        const currency = countryInfo.currency; // Obtenez la devise du pays

        const currencyInfo = await fetchCurrencyInfo(currency);

        projectPanelElement.replaceChildren(); // Remplace les enfants du panneau des projets

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Country Info';
        const projectDescription = document.createElement('p');
        projectDescription.innerHTML = `
            <strong>Common Name:</strong> ${countryInfo.common_name}<br>
            <strong>Official Name:</strong> ${countryInfo.official_name}<br>
            <strong>Language:</strong> ${countryInfo.language}<br>
            <strong>Region:</strong> ${countryInfo.region}<br>
            <strong>Capital:</strong> ${countryInfo.capital}<br>
            <strong>Currency:</strong> ${countryInfo.currency}<br>
            <strong>Base Currency:</strong> ${currencyInfo.base}<br>
            <strong>Rates:</strong> ${JSON.stringify(currencyInfo.rates)}<br>
        `;
        projectPanelElement.appendChild(projectTitle);
        projectPanelElement.appendChild(projectDescription);
    };

    // Écouteur d'événement pour le clic sur le bouton d'envoi
    submitButton.addEventListener('click', async () => {
        await updateProjectsList();
    });
});
