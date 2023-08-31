import getForecastWeatherData from "./api";

const domController = (() => {
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
    location.classList.add("location-input");
    document.querySelector("body").appendChild(location);
  };

  const handleSearch = async () => {
    const location = document.getElementById("location").value;
    console.log(location);
    if (!location) return;
    const btn = document.getElementById("search");
    btn.setAttribute("disabled", true);
    await getForecastWeatherData(location);
    btn.removeAttribute("disabled");
    document.getElementById("location").value = "";
  };

  return {
    renderPage,
  };
})();

export default domController;
