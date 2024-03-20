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
    const projectPanelElement = document.getElementById('project-panel');
    const submitButton = document.getElementById('submit-btn');
    const currencySelect = document.getElementById('currency-select');

    // Mise à jour du panneau des projets
    const updateProjectsList = async () => {
        const countryName = countryInput.value;
        const countryInfo = await fetchCountryInfo(countryName);
        const currency = countryInfo.currency;
        const currencyInfo = await fetchCurrencyInfo(currency);

        projectPanelElement.replaceChildren(); // Remplace les enfants du panneau des projets

        // Affichage des informations sur le pays sans les taux ni la devise de base
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Country Information';

        const projectDescription = document.createElement('p');
        projectDescription.innerHTML = `
            <strong>Common Name:</strong> ${countryInfo.common_name}<br>
            <strong>Official Name:</strong> ${countryInfo.official_name}<br>
            <strong>Language:</strong> ${countryInfo.language}<br>
            <strong>Region:</strong> ${countryInfo.region}<br>
            <strong>Capital:</strong> ${countryInfo.capital}<br>
            <strong>Latitude:</strong> ${countryInfo.latlng[0]}<br>
            <strong>Longitude:</strong> ${countryInfo.latlng[1]}<br>
        `;

        projectPanelElement.appendChild(projectTitle);
        projectPanelElement.appendChild(projectDescription);

        // Affichage de la devise sélectionnée avec son taux
        const selectedCurrency = currencySelect.value;
        const selectedRate = currencyInfo.rates[selectedCurrency];

        const ratesTitle = document.createElement('h2');
        ratesTitle.textContent = 'Exchange Rate';

        const ratesDescription = document.createElement('p');
        ratesDescription.innerHTML = `
            <strong>Selected Currency:</strong> ${selectedCurrency}<br>
            <strong>Selected Rate:</strong> ${selectedRate}<br>
        `;

        projectPanelElement.appendChild(ratesTitle);
        projectPanelElement.appendChild(ratesDescription);
    };
    
    // Événement pour le clic sur le bouton de soumission
    submitButton.addEventListener('click', async () => {
        await updateProjectsList();
    });
});
