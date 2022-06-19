const randomDish = document.querySelector('.random');
const body = document.querySelector('.body');
const dishName = document.querySelector('.dishName');
const dishRecipe = document.querySelector('.dishRecipe');
const ingrList = document.querySelector('.ingrList');
const videoRecipe = document.querySelector('.videoRecipe');
const dishImage = document.querySelector('.dishImage');
const main = document.querySelector('.main');
const search = document.querySelector('.input input');
const list = document.querySelector('.list');

const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getIngridientList = (meal) => {
  console.log(meal);
  let ingrList = [];
  let ingridient;
  for (i = 1; i < 21; i++) {
    if (!!meal['strIngredient' + i] != false) {
      ingridient = `${meal['strIngredient' + i]} : ${meal['strMeasure' + +i]}`;

      ingrList.push(ingridient);
    }
  }
  return ingrList;
};

function ingrListToHTML(ingrList) {
  let res = document.createElement('ul');
  ingrList.forEach((element) => {
    let row = document.createElement('li');
    row.innerHTML = element;
    res.append(row);
  });
  return res;
}

const renderDish = (dish) => {
  dishImage.src = dish.strMealThumb;
  dishImage.alt = dish.strMeal;
  dishName.innerHTML = dish.strMeal;
  dishRecipe.innerHTML = dish.strInstructions;
  ingrList.append(ingrListToHTML(getIngridientList(dish)));
  videoRecipe.href = dish.strYoutube;
  videoRecipe.style.display = 'block';
  main.style.display = 'none';
};

const renderData = (data) => {
  if (data != null) {
    if (data.length > 10) {
      data.slice(0, 8);
    }
    data.forEach((el) => {
      let listEl = document.createElement('li');
      listEl.append(el.strMeal);
      list.append(listEl);
      list.style.display = 'block';
    });
  } else {
    list.innerHTML = '';
  }
};

const getMeals = (url) => {
  const dish = fetch(url)
    .then((res) => res.json())
    .then((response) => renderData(response.meals));
};

search.addEventListener('input', (el) => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${el.target.value}`;
  getMeals(url);
});

const getRandomDish = () => {
  const dish = fetch(url)
    .then((res) => res.json())
    .then((response) => renderDish(response.meals[0]));
};
randomDish.addEventListener('click', getRandomDish);
