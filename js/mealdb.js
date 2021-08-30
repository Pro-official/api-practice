const searchFood = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(urlName)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.meals));
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(
                      0,
                      200
                    )}</p>
                </div>
            </div>
        `;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = (mealId) => {
  const singleUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(singleUrl)
    .then((res) => res.json())
    .then((data) => displaySingle(data.meals[0]));
};

const displaySingle = (meal) => {
  console.log(meal);
  const mealDetail = document.getElementById("meal-details");
  mealDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                <a href="${meal.strSource}" class="btn btn-primary">See Blog</a>
            </div>
            `;
  mealDetail.appendChild(div);
};
