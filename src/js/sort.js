jQuery(function($) {
  let $beerList = $(".beer-list");
  let $sortId = $(".sort__link-id");
  let $sortName = $(".sort__link-name");
  let $sortYear = $(".sort__link-year");
  let beerItem = ".beer-item";

  $sortId.on("click", function(e) {
    if (e.target.dataset.order === "asc") {
      $beerList
        .find(".beer-item")
        .sort((a, b) => {
          return +a.dataset.id - +b.dataset.id;
        })
        .appendTo($beerList);
    } else {
      $beerList
        .find(".beer-item")
        .sort((a, b) => {
          return +b.dataset.id - +a.dataset.id;
        })
        .appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });

  $sortYear.on("click", function(e) {
    if (e.target.dataset.order === "asc") {
      $beerList
        .find(beerItem)
        .sort((a, b) => {
          return +a.dataset.year - +b.dataset.year;
        })
        .appendTo($beerList);
    } else {
      $beerList
        .find(beerItem)
        .sort((a, b) => {
          return +b.dataset.year - +a.dataset.year;
        })
        .appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });

  $sortName.on("click", function(e) {
    if (e.target.dataset.order === "asc") {
      $beerList
        .find(beerItem)
        .sort((a, b) => {
          if (a.dataset.name < b.dataset.name) return -1;
          if (a.dataset.name > b.dataset.name) return 1;
          return 0;
        })
        .appendTo($beerList);
    } else {
      $beerList
        .find(beerItem)
        .sort((a, b) => {
          if (b.dataset.name < a.dataset.name) return -1;
          if (b.dataset.name > a.dataset.name) return 1;
          return 0;
        })
        .appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });
});
