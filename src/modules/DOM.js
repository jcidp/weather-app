import getForecastWeatherData from "./api";

const domController = (() => {
  let units = "c";
  let city = "nyc";
  let weatherData;
  let validCity = true;

  const renderHeader = () => {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Weather Watch";
    header.appendChild(title);
    document.querySelector("body").appendChild(header);
  };

  const renderFooter = () => {
    const footer = document.createElement("footer");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "https://github.com/jcidp");
    anchor.setAttribute("target", "_blank");
    const p = document.createElement("p");
    p.textContent = "Made by jcidp";
    p.setAttribute("id", "author");
    anchor.appendChild(p);
    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    const iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    const title = document.createElement("title");
    title.textContent = "GitHub";
    iconSvg.appendChild(title);
    iconSvg.setAttribute("viewBox", "0 0 24 24");
    iconPath.setAttribute(
      "d",
      "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z",
    );
    iconSvg.appendChild(iconPath);
    anchor.appendChild(iconSvg);
    footer.appendChild(anchor);

    const body = document.querySelector("body");
    body.appendChild(footer);
  };

  const renderPage = () => {
    renderHeader();
    const main = document.createElement("main");
    const location = document.createElement("form");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "City: ";
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "location");
    input.setAttribute("id", "location");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("placeholder", "New York");
    label.appendChild(input);
    location.appendChild(label);
    const btn = document.createElement("button");
    btn.textContent = "Search";
    btn.setAttribute("id", "search");
    btn.addEventListener("click", handleSearch);
    location.appendChild(btn);
    location.classList.add("location-input");
    main.appendChild(location);

    const toggleContainer = document.createElement("div");
    toggleContainer.classList.add("toggle-container");
    const toggleLabel = document.createElement("label");
    toggleLabel.classList.add("switch");
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.setAttribute("id", "units");
    toggle.addEventListener("click", toggleUnits);
    toggleLabel.appendChild(toggle);
    const toggleSpan = document.createElement("span");
    toggleSpan.classList.add("slider");
    toggleLabel.appendChild(toggleSpan);
    toggleContainer.appendChild(toggleLabel);
    main.appendChild(toggleContainer);

    const container = document.createElement("section");
    container.classList.add("results-container");
    main.appendChild(container);

    document.querySelector("body").appendChild(main);
    renderFooter();

    input.focus();
    loadSearch();
  };

  const handleSearch = () => {
    const location = document.getElementById("location").value;
    if (!location) return;
    city = location;
    loadSearch();
  };

  const showError = () => {
    validCity = false;
    const container = document.querySelector(".results-container");
    const errorEle = document.createElement("p");
    errorEle.classList.add("error");
    errorEle.textContent = `Unable to get results for "${city}". Please ensure it's a valid location spelled correctly or try again later.`;
    container.appendChild(errorEle);
  };

  const loadSearch = async () => {
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    renderLoader();
    weatherData = await getForecastWeatherData(city);
    btn.removeAttribute("disabled");
    cleanWeatherDisplay();
    if (weatherData.name === "Error") return showError(weatherData);
    document.getElementById("location").value = "";
    validCity = true;
    renderWeatherData(weatherData);
  };

  const renderLoader = () => {
    cleanWeatherDisplay();
    const container = document.querySelector(".results-container");
    const loader = document.createElement("span");
    loader.classList.add("loader");
    container.appendChild(loader);
  };

  const toggleUnits = (e) => {
    units = e.target.checked ? "f" : "c";
    if (!validCity) return;
    cleanWeatherDisplay();
    renderWeatherData(weatherData);
  };

  const cleanWeatherDisplay = () => {
    const parent = document.querySelector(".results-container");
    let child = parent.firstElementChild;
    while (child) {
      parent.removeChild(child);
      child = parent.firstElementChild;
    }
  };

  const renderWeatherData = (data) => {
    const container = document.querySelector(".results-container");
    const location = document.createElement("p");
    location.textContent = `Showing results for location: ${data.location}`;
    location.classList.add("results-location");
    container.appendChild(location);

    const nowContainer = document.createElement("div");
    nowContainer.classList.add("weather-container");
    nowContainer.classList.add("now");
    const title = document.createElement("h2");
    title.textContent = "Now";
    nowContainer.appendChild(title);
    const nowIcon = document.createElement("img");
    nowIcon.src = `https:${data.now.icon}`;
    nowContainer.appendChild(nowIcon);
    const nowTemp = document.createElement("p");
    nowTemp.textContent = `Currently: ${
      data.now[`temp_${units}`]
    }°${units.toUpperCase()}`;
    nowContainer.appendChild(nowTemp);
    container.appendChild(nowContainer);

    const dict = { 0: "today", 1: "tomorrow", 2: "day_after_tomorrow" };

    for (let i = 0; i < 3; i++) {
      const dayContainer = document.createElement("div");
      dayContainer.classList.add("weather-container");
      dayContainer.classList.add(dict[i]);
      const title = document.createElement("h2");
      const day =
        dict[i] === "day_after_tomorrow" ? "day after tomorrow" : dict[i];
      title.textContent = day[0].toUpperCase() + day.slice(1);
      dayContainer.appendChild(title);
      const dayIcon = document.createElement("img");
      dayIcon.src = `https:${data[dict[i]].icon}`;
      dayContainer.appendChild(dayIcon);
      const dayAvgTemp = document.createElement("p");
      dayAvgTemp.textContent = `Avg: ${
        data[dict[i]][`temp_${units}`]
      }°${units.toUpperCase()}`;
      dayContainer.appendChild(dayAvgTemp);
      const tempRange = document.createElement("p");
      tempRange.textContent = `${
        data[dict[i]][`mintemp_${units}`]
      }°${units.toUpperCase()} - ${
        data[dict[i]][`maxtemp_${units}`]
      }°${units.toUpperCase()}`;
      dayContainer.appendChild(tempRange);
      const rainChance = document.createElement("p");
      rainChance.textContent = `Rain chance: ${data[dict[i]].rain_chance}%`;
      dayContainer.appendChild(rainChance);
      if (data[dict[i]].snow_chance) {
        const snowChance = document.createElement("p");
        snowChance.textContent = `Rain chance: ${data[dict[i]].snow_chance}%`;
        dayContainer.appendChild(snowChance);
      }
      container.appendChild(dayContainer);
    }
  };

  return {
    renderPage,
  };
})();

export default domController;
