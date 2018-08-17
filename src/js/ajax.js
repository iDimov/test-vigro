(async () => {
  try {
    let dataApi = await fetch("https://api.punkapi.com/v2/beers");
    let beers = await dataApi.json();
    let $beerList = document.querySelector(".beer-list");
    console.log(beers);

    let data = [];
    beers.map(v => {
      let yearArr = v.first_brewed.split("/");
      let dataObj = {};
      dataObj.name = v.name;
      dataObj.image_url = v.image_url;
      dataObj.id = v.id;
      dataObj.year = yearArr[1];
      dataObj.tagline = v.tagline;
      data.push(dataObj);
    });

    const template = document.querySelector("#beers-template").textContent;
    const render = Handlebars.compile(template);
    const html = render(data);
    $beerList.innerHTML = html;
    document.querySelector("#preloader").style.display = "none";
    clickHandler();
  } catch (e) {
    console.error(e);
  }
})();

function clickHandler() {
  document.querySelector(".beer-list").addEventListener("click", function(e) {
    e.preventDefault();
    let currentId;
    currentId = e.target.dataset.id
      ? e.target.dataset.id
      : e.target.parentNode.dataset.id;
    getBeer(currentId);
  });
  async function getBeer(currentId) {
    try {
      document.querySelector("#preloader").style.position = "fixed";
      document.querySelector("#preloader").style.display = "initial";
      let dataApi = await fetch(
        `https://api.punkapi.com/v2/beers/${currentId}`
      );
      let beerData = await dataApi.json();
      let $beerDialog = document.querySelector("#beer-dialog");

      let beer = {};
      beer.id = beerData[0].id;
      beer.name = beerData[0].name;
      beer.image_url = beerData[0].image_url;
      beer.first_brewed = beerData[0].first_brewed;
      beer.tagline = beerData[0].tagline;
      beer.description = beerData[0].description;
      beer.boil_volume = beerData[0].boil_volume;
      beer.food_pairing = beerData[0].food_pairing;

      const template = document.querySelector("#beer-template").textContent;
      const render = Handlebars.compile(template);
      const html = render(beer);
      $beerDialog.innerHTML = html;
      document.querySelector("#preloader").style.display = "none";
      $beerDialog.style.display = "block";
    } catch (e) {
      console.error(e);
    }
  }
}
