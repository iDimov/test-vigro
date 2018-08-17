"use strict";

(async function () {
  try {
    var dataApi = await fetch("https://api.punkapi.com/v2/beers");
    var beers = await dataApi.json();
    var $beerList = document.querySelector(".beer-list");
    console.log(beers);

    var data = [];
    beers.map(function (v) {
      var yearArr = v.first_brewed.split("/");
      var dataObj = {};
      dataObj.name = v.name;
      dataObj.image_url = v.image_url;
      dataObj.id = v.id;
      dataObj.year = yearArr[1];
      dataObj.tagline = v.tagline;
      data.push(dataObj);
    });

    var template = document.querySelector("#beers-template").textContent;
    var render = Handlebars.compile(template);
    var html = render(data);
    $beerList.innerHTML = html;
    document.querySelector("#preloader").style.display = "none";
    clickHandler();
  } catch (e) {
    console.error(e);
  }
})();

function clickHandler() {
  document.querySelector(".beer-list").addEventListener("click", function (e) {
    e.preventDefault();
    var currentId = void 0;
    currentId = e.target.dataset.id ? e.target.dataset.id : e.target.parentNode.dataset.id;
    getBeer(currentId);
  });
  async function getBeer(currentId) {
    try {
      document.querySelector("#preloader").style.position = "fixed";
      document.querySelector("#preloader").style.display = "initial";
      var dataApi = await fetch("https://api.punkapi.com/v2/beers/" + currentId);
      var beerData = await dataApi.json();
      var $beerDialog = document.querySelector("#beer-dialog");

      var beer = {};
      beer.id = beerData[0].id;
      beer.name = beerData[0].name;
      beer.image_url = beerData[0].image_url;
      beer.first_brewed = beerData[0].first_brewed;
      beer.tagline = beerData[0].tagline;
      beer.description = beerData[0].description;
      beer.boil_volume = beerData[0].boil_volume;
      beer.food_pairing = beerData[0].food_pairing;

      var template = document.querySelector("#beer-template").textContent;
      var render = Handlebars.compile(template);
      var html = render(beer);
      $beerDialog.innerHTML = html;
      document.querySelector("#preloader").style.display = "none";
      $beerDialog.style.display = "block";
    } catch (e) {
      console.error(e);
    }
  }
}
"use strict";

jQuery(function ($) {
  $(".beer").on("click", ".beer-dialog__close", function () {
    console.log("ds");
    $("#beer-dialog").fadeOut();
  });
});
"use strict";

function searchName() {
  var input, filter, ul, li, a, i;
  input = document.querySelector(".search");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".beer-list");
  li = document.querySelectorAll(".beer-item");
  var newss = Array.from(li);
  a = li[0].dataset.name;
  for (i = 0; i < li.length; i++) {
    a = li[i].dataset.name;
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

document.querySelector(".search").addEventListener("keyup", searchName);
"use strict";

jQuery(function ($) {
  var $beerList = $(".beer-list");
  var $sortId = $(".sort__link-id");
  var $sortName = $(".sort__link-name");
  var $sortYear = $(".sort__link-year");
  var beerItem = ".beer-item";

  $sortId.on("click", function (e) {
    if (e.target.dataset.order === "asc") {
      $beerList.find(".beer-item").sort(function (a, b) {
        return +a.dataset.id - +b.dataset.id;
      }).appendTo($beerList);
    } else {
      $beerList.find(".beer-item").sort(function (a, b) {
        return +b.dataset.id - +a.dataset.id;
      }).appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });

  $sortYear.on("click", function (e) {
    if (e.target.dataset.order === "asc") {
      $beerList.find(beerItem).sort(function (a, b) {
        return +a.dataset.year - +b.dataset.year;
      }).appendTo($beerList);
    } else {
      $beerList.find(beerItem).sort(function (a, b) {
        return +b.dataset.year - +a.dataset.year;
      }).appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });

  $sortName.on("click", function (e) {
    if (e.target.dataset.order === "asc") {
      $beerList.find(beerItem).sort(function (a, b) {
        if (a.dataset.name < b.dataset.name) return -1;
        if (a.dataset.name > b.dataset.name) return 1;
        return 0;
      }).appendTo($beerList);
    } else {
      $beerList.find(beerItem).sort(function (a, b) {
        if (b.dataset.name < a.dataset.name) return -1;
        if (b.dataset.name > a.dataset.name) return 1;
        return 0;
      }).appendTo($beerList);
    }
    e.target.dataset.order = e.target.dataset.order === "asc" ? "desc" : "asc";
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiLCJjb21tb24uanMiLCJzZWFyY2guanMiLCJzb3J0LmpzIl0sIm5hbWVzIjpbImRhdGFBcGkiLCJmZXRjaCIsImJlZXJzIiwianNvbiIsIiRiZWVyTGlzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwibWFwIiwieWVhckFyciIsInYiLCJmaXJzdF9icmV3ZWQiLCJzcGxpdCIsImRhdGFPYmoiLCJuYW1lIiwiaW1hZ2VfdXJsIiwiaWQiLCJ5ZWFyIiwidGFnbGluZSIsInB1c2giLCJ0ZW1wbGF0ZSIsInRleHRDb250ZW50IiwicmVuZGVyIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJodG1sIiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xpY2tIYW5kbGVyIiwiZSIsImVycm9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudElkIiwidGFyZ2V0IiwiZGF0YXNldCIsInBhcmVudE5vZGUiLCJnZXRCZWVyIiwicG9zaXRpb24iLCJiZWVyRGF0YSIsIiRiZWVyRGlhbG9nIiwiYmVlciIsImRlc2NyaXB0aW9uIiwiYm9pbF92b2x1bWUiLCJmb29kX3BhaXJpbmciLCJqUXVlcnkiLCIkIiwib24iLCJmYWRlT3V0Iiwic2VhcmNoTmFtZSIsImlucHV0IiwiZmlsdGVyIiwidWwiLCJsaSIsImEiLCJpIiwidmFsdWUiLCJ0b1VwcGVyQ2FzZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJuZXdzcyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImluZGV4T2YiLCIkc29ydElkIiwiJHNvcnROYW1lIiwiJHNvcnRZZWFyIiwiYmVlckl0ZW0iLCJvcmRlciIsImZpbmQiLCJzb3J0IiwiYiIsImFwcGVuZFRvIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsa0JBQVk7QUFDWCxNQUFJO0FBQ0YsUUFBSUEsVUFBVSxNQUFNQyxNQUFNLGtDQUFOLENBQXBCO0FBQ0EsUUFB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QUFpQmlDLEtBQWpCLEtBQTJCLEtBQTNCLEdBQW1DLE1BQW5DLEdBQTRDLEtBQXJFO0FBQ0QsR0FyQkQ7QUFzQkQsQ0FuRUQiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQgZGF0YUFwaSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkucHVua2FwaS5jb20vdjIvYmVlcnNcIik7XG4gICAgbGV0IGJlZXJzID0gYXdhaXQgZGF0YUFwaS5qc29uKCk7XG4gICAgbGV0ICRiZWVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmVlci1saXN0XCIpO1xuICAgIGNvbnNvbGUubG9nKGJlZXJzKTtcblxuICAgIGxldCBkYXRhID0gW107XG4gICAgYmVlcnMubWFwKHYgPT4ge1xuICAgICAgbGV0IHllYXJBcnIgPSB2LmZpcnN0X2JyZXdlZC5zcGxpdChcIi9cIik7XG4gICAgICBsZXQgZGF0YU9iaiA9IHt9O1xuICAgICAgZGF0YU9iai5uYW1lID0gdi5uYW1lO1xuICAgICAgZGF0YU9iai5pbWFnZV91cmwgPSB2LmltYWdlX3VybDtcbiAgICAgIGRhdGFPYmouaWQgPSB2LmlkO1xuICAgICAgZGF0YU9iai55ZWFyID0geWVhckFyclsxXTtcbiAgICAgIGRhdGFPYmoudGFnbGluZSA9IHYudGFnbGluZTtcbiAgICAgIGRhdGEucHVzaChkYXRhT2JqKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiZWVycy10ZW1wbGF0ZVwiKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCByZW5kZXIgPSBIYW5kbGViYXJzLmNvbXBpbGUodGVtcGxhdGUpO1xuICAgIGNvbnN0IGh0bWwgPSByZW5kZXIoZGF0YSk7XG4gICAgJGJlZXJMaXN0LmlubmVySFRNTCA9IGh0bWw7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmVsb2FkZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGNsaWNrSGFuZGxlcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJlZXItbGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY3VycmVudElkO1xuICAgIGN1cnJlbnRJZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcbiAgICAgID8gZS50YXJnZXQuZGF0YXNldC5pZFxuICAgICAgOiBlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaWQ7XG4gICAgZ2V0QmVlcihjdXJyZW50SWQpO1xuICB9KTtcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0QmVlcihjdXJyZW50SWQpIHtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmVsb2FkZXJcIikuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZWxvYWRlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XG4gICAgICBsZXQgZGF0YUFwaSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkucHVua2FwaS5jb20vdjIvYmVlcnMvJHtjdXJyZW50SWR9YFxuICAgICAgKTtcbiAgICAgIGxldCBiZWVyRGF0YSA9IGF3YWl0IGRhdGFBcGkuanNvbigpO1xuICAgICAgbGV0ICRiZWVyRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiZWVyLWRpYWxvZ1wiKTtcblxuICAgICAgbGV0IGJlZXIgPSB7fTtcbiAgICAgIGJlZXIuaWQgPSBiZWVyRGF0YVswXS5pZDtcbiAgICAgIGJlZXIubmFtZSA9IGJlZXJEYXRhWzBdLm5hbWU7XG4gICAgICBiZWVyLmltYWdlX3VybCA9IGJlZXJEYXRhWzBdLmltYWdlX3VybDtcbiAgICAgIGJlZXIuZmlyc3RfYnJld2VkID0gYmVlckRhdGFbMF0uZmlyc3RfYnJld2VkO1xuICAgICAgYmVlci50YWdsaW5lID0gYmVlckRhdGFbMF0udGFnbGluZTtcbiAgICAgIGJlZXIuZGVzY3JpcHRpb24gPSBiZWVyRGF0YVswXS5kZXNjcmlwdGlvbjtcbiAgICAgIGJlZXIuYm9pbF92b2x1bWUgPSBiZWVyRGF0YVswXS5ib2lsX3ZvbHVtZTtcbiAgICAgIGJlZXIuZm9vZF9wYWlyaW5nID0gYmVlckRhdGFbMF0uZm9vZF9wYWlyaW5nO1xuXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmVlci10ZW1wbGF0ZVwiKS50ZXh0Q29udGVudDtcbiAgICAgIGNvbnN0IHJlbmRlciA9IEhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wbGF0ZSk7XG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyKGJlZXIpO1xuICAgICAgJGJlZXJEaWFsb2cuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJlbG9hZGVyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICRiZWVyRGlhbG9nLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9XG4gIH1cbn1cbiIsImpRdWVyeShmdW5jdGlvbigkKSB7XG4gICQoXCIuYmVlclwiKS5vbihcImNsaWNrXCIsIFwiLmJlZXItZGlhbG9nX19jbG9zZVwiLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcImRzXCIpO1xuICAgICQoXCIjYmVlci1kaWFsb2dcIikuZmFkZU91dCgpO1xuICB9KTtcbn0pO1xuIiwiZnVuY3Rpb24gc2VhcmNoTmFtZSgpIHtcbiAgdmFyIGlucHV0LCBmaWx0ZXIsIHVsLCBsaSwgYSwgaTtcbiAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcbiAgZmlsdGVyID0gaW5wdXQudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJlZXItbGlzdFwiKTtcbiAgbGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJlZXItaXRlbVwiKTtcbiAgbGV0IG5ld3NzID0gQXJyYXkuZnJvbShsaSk7XG4gIGEgPSBsaVswXS5kYXRhc2V0Lm5hbWU7XG4gIGZvciAoaSA9IDA7IGkgPCBsaS5sZW5ndGg7IGkrKykge1xuICAgIGEgPSBsaVtpXS5kYXRhc2V0Lm5hbWU7XG4gICAgaWYgKGEudG9VcHBlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPiAtMSkge1xuICAgICAgbGlbaV0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHNlYXJjaE5hbWUpO1xuIiwialF1ZXJ5KGZ1bmN0aW9uKCQpIHtcbiAgbGV0ICRiZWVyTGlzdCA9ICQoXCIuYmVlci1saXN0XCIpO1xuICBsZXQgJHNvcnRJZCA9ICQoXCIuc29ydF9fbGluay1pZFwiKTtcbiAgbGV0ICRzb3J0TmFtZSA9ICQoXCIuc29ydF9fbGluay1uYW1lXCIpO1xuICBsZXQgJHNvcnRZZWFyID0gJChcIi5zb3J0X19saW5rLXllYXJcIik7XG4gIGxldCBiZWVySXRlbSA9IFwiLmJlZXItaXRlbVwiO1xuXG4gICRzb3J0SWQub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQub3JkZXIgPT09IFwiYXNjXCIpIHtcbiAgICAgICRiZWVyTGlzdFxuICAgICAgICAuZmluZChcIi5iZWVyLWl0ZW1cIilcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICByZXR1cm4gK2EuZGF0YXNldC5pZCAtICtiLmRhdGFzZXQuaWQ7XG4gICAgICAgIH0pXG4gICAgICAgIC5hcHBlbmRUbygkYmVlckxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYmVlckxpc3RcbiAgICAgICAgLmZpbmQoXCIuYmVlci1pdGVtXCIpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICtiLmRhdGFzZXQuaWQgLSArYS5kYXRhc2V0LmlkO1xuICAgICAgICB9KVxuICAgICAgICAuYXBwZW5kVG8oJGJlZXJMaXN0KTtcbiAgICB9XG4gICAgZS50YXJnZXQuZGF0YXNldC5vcmRlciA9IGUudGFyZ2V0LmRhdGFzZXQub3JkZXIgPT09IFwiYXNjXCIgPyBcImRlc2NcIiA6IFwiYXNjXCI7XG4gIH0pO1xuXG4gICRzb3J0WWVhci5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5vcmRlciA9PT0gXCJhc2NcIikge1xuICAgICAgJGJlZXJMaXN0XG4gICAgICAgIC5maW5kKGJlZXJJdGVtKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIHJldHVybiArYS5kYXRhc2V0LnllYXIgLSArYi5kYXRhc2V0LnllYXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5hcHBlbmRUbygkYmVlckxpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYmVlckxpc3RcbiAgICAgICAgLmZpbmQoYmVlckl0ZW0pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICtiLmRhdGFzZXQueWVhciAtICthLmRhdGFzZXQueWVhcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmFwcGVuZFRvKCRiZWVyTGlzdCk7XG4gICAgfVxuICAgIGUudGFyZ2V0LmRhdGFzZXQub3JkZXIgPSBlLnRhcmdldC5kYXRhc2V0Lm9yZGVyID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xuICB9KTtcblxuICAkc29ydE5hbWUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQub3JkZXIgPT09IFwiYXNjXCIpIHtcbiAgICAgICRiZWVyTGlzdFxuICAgICAgICAuZmluZChiZWVySXRlbSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYS5kYXRhc2V0Lm5hbWUgPCBiLmRhdGFzZXQubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmIChhLmRhdGFzZXQubmFtZSA+IGIuZGF0YXNldC5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSlcbiAgICAgICAgLmFwcGVuZFRvKCRiZWVyTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRiZWVyTGlzdFxuICAgICAgICAuZmluZChiZWVySXRlbSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYi5kYXRhc2V0Lm5hbWUgPCBhLmRhdGFzZXQubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICAgIGlmIChiLmRhdGFzZXQubmFtZSA+IGEuZGF0YXNldC5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSlcbiAgICAgICAgLmFwcGVuZFRvKCRiZWVyTGlzdCk7XG4gICAgfVxuICAgIGUudGFyZ2V0LmRhdGFzZXQub3JkZXIgPSBlLnRhcmdldC5kYXRhc2V0Lm9yZGVyID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xuICB9KTtcbn0pO1xuIl19