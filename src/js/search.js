function searchName() {
  var input, filter, ul, li, a, i;
  input = document.querySelector(".search");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".beer-list");
  li = document.querySelectorAll(".beer-item");
  let newss = Array.from(li);
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
