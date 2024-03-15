const fetchCountryInfo = async (countryName) => {
    const response = await fetch(`/api/country?name=${countryName}`);
    return response.json();
};

const fetchCurrencyInfo = async () => {
    const response = await fetch('/api/convert');
    return response.json();
};

// Fonction pour récupérer les langues
const fetchLanguages = async () => {
    // Implémentez la logique pour récupérer les langues depuis votre backend
    // Retournez les langues sous forme de tableau
    return ['French', 'English', 'Spanish']; // Exemple de données simulées
};

document.addEventListener('DOMContentLoaded', async () => {
    let selectedLang;
    const languageSelectElement = document.getElementById('language-select');

    const languages = await fetchLanguages();

    languages.forEach((language) => {
        const languageOption = document.createElement('option');
        languageOption.value = language;
        languageOption.textContent = language;
        languageSelectElement.appendChild(languageOption);
    });

    languageSelectElement.addEventListener('change', async (event) => {
        selectedLang = event.target.value;
        const projectsListElement = document.getElementById('projects-list');
        const projectPanelElement = document.getElementById('project-panel');
        projectsListElement.replaceChildren();
        projectPanelElement.replaceChildren();

        const projects = await fetchProjects(selectedLang);
        projects.forEach((project) => {
            const projectItem = document.createElement('li');
            projectItem.textContent = project.title;
            projectItem.dataset.pnId = project.id;
            projectsListElement.appendChild(projectItem);

            projectItem.addEventListener('click', async (event) => {
                const selectedProject = document.querySelector('.selected');
                selectedProject?.classList.remove('selected');
                event.target.classList.add('selected');

                const project = await fetchProject(event.target.dataset.pnId, selectedLang);

                projectPanelElement.replaceChildren();
                const projectTitle = document.createElement('h2');
                projectTitle.textContent = project.title;
                const projectDescription = document.createElement('p');
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
                projectPanelElement.appendChild(projectTitle);
                projectPanelElement.appendChild(projectDescription);
            });
        });
    });

    const fetchProjects = async (lang) => {
        const countryInput = document.getElementById('country-input');
        const countryName = countryInput.value;

        const [countryInfo, currencyInfo] = await Promise.all([
            fetchCountryInfo(countryName),
            fetchCurrencyInfo()
        ]);

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

        return [project];
    };
});
