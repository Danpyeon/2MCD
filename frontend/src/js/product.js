setTitle();

function setTitle() {
  const params = new URLSearchParams(location.search);
  let brand = params.get("sort");
  let text = "";

  switch (brand) {
    case "maxbone":
      text = "MAXBONE";
      break;
    case "pet-so-chic":
    case "petsochic":
      text = "PET SO CHIC";
      break;
    case "milk-and-pepper":
    case "milkandpepper":
      text = "MILK & PEPPER";
      break;

    default:
      break;
  }

  $(".title").text(text);
}
