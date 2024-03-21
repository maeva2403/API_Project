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
    const amountInput = document.getElementById('amount');

    // Mise à jour du panneau des projets
    const updateProjectsList = async () => {
        const countryName = countryInput.value;
        const countryInfo = await fetchCountryInfo(countryName);
        const currency = countryInfo.currency;
        const currencyInfo = await fetchCurrencyInfo(currency);

        projectPanelElement.innerHTML = ''; // Efface le contenu précédent du panneau des projets

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
        const selectedCurrency = countryInfo.currency;
        const selectedRate = currencyInfo.rates[selectedCurrency];

        const ratesTitle = document.createElement('h2');
        ratesTitle.textContent = 'Exchange Rate';

        const ratesDescription = document.createElement('p');
        ratesDescription.innerHTML = `
            <strong>Currency:</strong> ${selectedCurrency}<br>
            <strong>Rate:</strong> ${selectedRate}<br>
        `;

        projectPanelElement.appendChild(ratesTitle);
        projectPanelElement.appendChild(ratesDescription);

        // Mise à jour du résultat de la conversion
        const amount = amountInput.value;
        const convertedAmount = amount * selectedRate;
        updateConversionResult(convertedAmount.toFixed(2));
    };

    // Fonction pour mettre à jour le résultat de la conversion
    const updateConversionResult = (result) => {
        const resultTitle = document.createElement('h2');
        resultTitle.textContent = 'Conversion Result';

        const resultDescription = document.createElement('p');
        const strongElement = document.createElement('strong');
        strongElement.textContent = 'Conversion Result: ';
        resultDescription.appendChild(strongElement);
        resultDescription.appendChild(document.createTextNode(result));


        projectPanelElement.appendChild(resultTitle);
        projectPanelElement.appendChild(resultDescription);
    };

    // Événement pour le clic sur le bouton de soumission
    submitButton.addEventListener('click', async () => {
        await updateProjectsList();
    });
});
