/** @format */

// ✅ SHOES ARRAY
const shoes = [
  {
    name: "Nike Epic React Flyknit",
    price: "$150",
    type: "Men's Running Shoe",
    image: "AIR+JORDAN+4+RM.avif",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "Nike Air Max Pro",
    price: "$800",
    type: "Men's Sneaker",
    image: "JORDAN+HEIR+SERIES.avif",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Dunk Low",
    price: "$700",
    type: "Men's Sneaker",
    image: "dunk-low-next-nature-shoes-Nyqy1CJZ.avif",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Air Force Black",
    price: "$180",
    type: "Men's Sneaker",
    image: "Nike_Air_Force_Black_DR0149-100_P1.jpg",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Black Edition",
    price: "$500",
    type: "Men's Sneaker",
    image: "NICKE BLACK.jpg",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike JJCC",
    price: "$680",
    type: "Men's Sneaker",
    image: "NICKE jjcc.jpg",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Next Nature",
    price: "$180",
    type: "Men's Sneaker",
    image: "air-force-1-07-next-nature-shoes-njbBj4N8.avif",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Uptempo",
    price: "$680",
    type: "Men's Sneaker",
    image: "6545137_more-uptempo-5.jpg",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    name: "Nike Retro Classic",
    price: "$680",
    type: "Men's Sneaker",
    image: "2314c245dd7876051386bf01d4f2896f.jpg",
    sizes: [6, 7, 8, 9, 10, 11],
  },
];

// INSERT SHOES INTO THE GRID
const container = document.getElementById("shoe-grid");

if (container) {
  shoes.forEach((shoe) => {
    const sizeButtons = shoe.sizes
      .map((s, i) => `<span class="${i === 0 ? "focus" : ""}">${s}</span>`)
      .join("");

    const shoeCard = document.createElement("div");
    shoeCard.className = "container";
    shoeCard.innerHTML = `
      <div class="image-and-size">
        <img src="${shoe.image}" alt="${shoe.name}">
        <div class="slideshow-buttons">
          <span></span><span class="focus"></span><span></span><span></span>
        </div>
        <p class="pick">Choose size</p>
        <div class="size">${sizeButtons}</div>
      </div>
      <div class="product">
        <p>${shoe.type}</p>
        <h1>${shoe.name}</h1>
        <h2>${shoe.price}</h2>
        <p class="description">
          High-performance shoe with modern design and excellent comfort. Perfect for active lifestyles.
        </p>
        <div class="buttons">
          <button class="add-to-cart">Add to Cart</button>
          <button class="like"><span>&#9829;</span></button>
        </div>
      </div>
    `;

    shoeCard.querySelector(".add-to-cart").addEventListener("click", () => {
      alert(`${shoe.name} added to cart!`);
    });

    container.appendChild(shoeCard);
  });
}

//  SLIDESHOW FUNCTION
let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }
  setTimeout(showSlides, 3000); // Change every 3 seconds
}
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
  }
  setTimeout(showSlides, 3000); // Change every 3 seconds
}
