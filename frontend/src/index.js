document.addEventListener('DOMContentLoaded', async () => {


    const countryInput = document.getElementById('country-input');

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

    // Mise à jour de la liste des projets
    const updateProjectsList = async () => {
        const countryName = countryInput.value; // Obtenez la valeur du champ de saisie de pays

        const countryInfo = await fetchCountryInfo(countryName);
        const currency = countryInfo.currency; // Obtenez la devise du pays

        const currencyInfo = await fetchCurrencyInfo(currency);

        const project = {
            title: 'Country Info',
            id: 1, // Vous devez définir un ID pour chaque projet
            common_name: countryInfo.common_name,
            official_name: countryInfo.official_name,
            language: countryInfo.language,
            region: countryInfo.region,
            capital: countryInfo.capital,
            currency: countryInfo.currency,
            base: currencyInfo.base,
            rates: currencyInfo.rates
        };

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title;
        const projectDescription = document.createElement('p');
        // projectDescription.classList.add('description')
        projectDescription.innerHTML = `
            <strong>Common Name:</strong> ${project.common_name}<br>
            <strong>Official Name:</strong> ${project.official_name}<br>
            <strong>Language:</strong> ${project.language}<br>
            <strong>Region:</strong> ${project.region}<br>
            <strong>Capital:</strong> ${project.capital}<br>
            <strong>Currency:</strong> ${project.currency}<br>
            <strong>Base Currency:</strong> ${project.base}<br>
            <strong>Rates:</strong> ${JSON.stringify(project.rates)}<br>
        `;
        document.body.appendChild(projectTitle);
        document.body.appendChild(projectDescription);
    };

    // Écouteur d'événement pour le clic sur le bouton d'envoi
    document.getElementById('submit-btn').addEventListener('click', async () => {
        await updateProjectsList();
    });
});
