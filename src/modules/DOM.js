import getForecastWeatherData from "./api";

const domController = (() => {
  let units = "c";
  const renderPage = () => {
    const location = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "location");
    label.textContent = "Location";
    location.appendChild(label);
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "location");
    input.setAttribute("id", "location");
    input.setAttribute("placeholder", "New York");
    location.appendChild(input);
    const btn = document.createElement("button");
    btn.textContent = "Search";
    btn.setAttribute("id", "search");
    btn.addEventListener("click", handleSearch);
    location.appendChild(btn);
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.setAttribute("id", "units");
    toggle.addEventListener("click", toggleUnits);
    location.appendChild(toggle);
    location.classList.add("location-input");
    document.querySelector("body").appendChild(location);

    const container = document.createElement("section");
    container.classList.add("results-container");
    document.querySelector("body").appendChild(container);
  };

  const handleSearch = async () => {
    const location = document.getElementById("location").value;
    console.log(location);
    if (!location) return;
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    const weatherData = await getForecastWeatherData(location);
    btn.removeAttribute("disabled");
    document.getElementById("location").value = "";
    console.log(weatherData);
    removeChildren(document.querySelector(".results-container"));
    renderWeatherData(weatherData);
  };

  const toggleUnits = (e) => {
    units = e.target.checked ? "c" : "f";
  };

  const removeChildren = (parent) => {
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
    nowTemp.textContent = "Currently: " + data.now[`temp_${units}`] + "°";
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
      dayAvgTemp.textContent = "Avg: " + data[dict[i]][`temp_${units}`] + "°";
      dayContainer.appendChild(dayAvgTemp);
      const tempRange = document.createElement("p");
      tempRange.textContent = `${data[dict[i]][`mintemp_${units}`]}° - ${
        data[dict[i]][`maxtemp_${units}`]
      }°`;
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
