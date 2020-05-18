const images = [
  {
    url: "images/sunflower.jpg",
    alt: "Sunflower",
    author: "Brigitte Tohm",
  },
  {
    url: "images/icyWaterfall.jpg",
    alt: "Icy Waterfall",
    author: "Rémy Penet",
  },
  {
    url: "images/cherryBlossom.jpg",
    alt: "Cherry Blossom",
    author: "The Miscellanista",
  },
  {
    url: "images/leaves.jpg",
    alt: "Leaves",
    author: "Vino Li",
  },
];

function loadImage(imageJSON) {
  return new Promise((resolve, reject) => {
    fetch(imageJSON.url).then((response) => {
      if (response.status == 200) {
        const arrayResponse = [];
        response.blob().then((imageBlob) => {
          arrayResponse[0] = imageBlob;
          arrayResponse[1] = imageJSON;
          resolve(arrayResponse);
        });
      } else {
        reject(
          Error(
            `Image did not load successfully; error code: ${response.status} ${response.statusText}`
          )
        );
      }
    });
  });
}

function runApp() {
  const main = document.querySelector("main");
  images.forEach((image) => {
    loadImage(image).then((arrayResponse) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const imageURL = window.URL.createObjectURL(arrayResponse[0]);
      img.src = imageURL;
      img.alt = arrayResponse[1].alt;
      figcaption.innerText = `${arrayResponse[1].alt} by ${arrayResponse[1].author}`;
      figure.append(img, figcaption);
      main.append(figure);
    });
  });
}

if (document.readyState !== "loading") {
  runApp();
} else {
  document.addEventListener("DOMContentLoaded", runApp);
}
