// Function to fetch country information based on country name
const fetchCountryInfo = async (countryName) => {
    const response = await fetch(`/api/country?name=${countryName}`);
    return response.json();
};

// Function to fetch currency conversion rates
const fetchCurrencyInfo = async () => {
    const response = await fetch(`/api/convert`);
    return response.json();
};

document.addEventListener('DOMContentLoaded', async () => {
    const countryInput = document.getElementById('country-input');
    const projectPanelElement = document.getElementById('project-panel');
    const submitButton = document.getElementById('submit-btn');
    const amountInput = document.getElementById('amount');

    // Update the projects panel
    const updateProjectsList = async () => {
        const countryName = countryInput.value;
        const countryInfo = await fetchCountryInfo(countryName);
        const currency = countryInfo.currency;
        const currencyInfo = await fetchCurrencyInfo(currency);

        projectPanelElement.innerHTML = ''; // Clear previous content from the projects panel

        // Display principal country information
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Country Information';

        const projectDescription = document.createElement('p');
        projectDescription.innerHTML = `
            <strong>Common Name:</strong> ${countryInfo.common_name}<br>
            <strong>Official Name:</strong> ${countryInfo.official_name}<br>
            <strong>Language:</strong> ${countryInfo.language}<br>
            <strong>Region:</strong> ${countryInfo.region}<br>
        `;

        projectPanelElement.appendChild(projectTitle);
        projectPanelElement.appendChild(projectDescription);

        // Display the currency from countryInfo along with its rate
        const Rate = currencyInfo.rates[countryInfo.currency];

        const ratesTitle = document.createElement('h2');
        ratesTitle.textContent = 'Exchange Rate';

        const ratesDescription = document.createElement('p');
        ratesDescription.innerHTML = `
            <strong>Currency:</strong> ${countryInfo.currency}<br>
            <strong>Rate:</strong> ${Rate}<br>
        `;

        projectPanelElement.appendChild(ratesTitle);
        projectPanelElement.appendChild(ratesDescription);

        // Update conversion result
        const amount = amountInput.value;
        const convertedAmount = amount * Rate;
        updateConversionResult(convertedAmount.toFixed(2));
    };

    // Function to update conversion result
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

    // Event listener for submission button click
    submitButton.addEventListener('click', async () => {
        await updateProjectsList();
    });
});
