"use strict";
/* VARIABLES */
const navigationContainer = document.querySelector(".navigation-links");
const currentQty = document.querySelectorAll(".card--quantity");
const emailList = document.querySelector(".email-list");
const signupAddbtn = document.querySelector(".sign-up--plus-icon");
const headerNavContainer = document.querySelector("#header-nav");
const linksContainer = document.querySelector(".navigation-links");
const accessoriesSection = document.getElementById("section--accessories");
const testimonialReview = document.querySelector(".testimonials--review");
const testimonialPhotoSection = document.querySelector(".testimonial-photos");

// Set Hero section to be positioned underneath Header
const headerNavHeight = headerNavContainer.getBoundingClientRect().height + 80;
const heroSectionContainer = document.querySelector("#section--hero");
heroSectionContainer.style.paddingTop = `${headerNavHeight}px`;

/* DOCUMENT FRAGMENTS */
// NAVIGATION LINKS
const linkArray = ["Gallery", "Accessories", "Sign Up", "Testimonials"];
const fragmentLinks = document.createDocumentFragment();
const list = document.createElement("ul");
list.classList.add("links", "flex-row");
linkArray.forEach((linkName) => {
  const link = document.createElement("a");
  const newListItem = document.createElement("li");

  link.classList.add("list");
  newListItem.classList.add("link");
  link.href = "#";
  link.textContent = linkName;
  newListItem.appendChild(link);
  list.appendChild(newListItem);
});

fragmentLinks.appendChild(list);
linksContainer.appendChild(fragmentLinks);

// PHOTO GALLERY
const photoDescriptionArray = [
  "A Man Wearing Black Tank Top Sitting inside a Gym Stock Photo",
  "A Woman in Brown Leopard Print Clothes Sitting on Black and Gray Exercise Equipment Stock Photo",
  "Man Inside the Gym Flexing his Muscles Stock Photo",
  "Sportsman Carrying Heavy Bag Training in Gym Stock Photo",
  "Woman Working Out with a Ball Stock Photo",
  "A Man in Black Tank Top Looking at the Foods on Aluminum Foil Pans Stock Photo",
  "A woman sitting on a bench holding a bottle Stock Photo",
  "Man doing Superman pushup",
  "Woman doing streches",
];
const fragmentPhotos = document.createDocumentFragment();
const galleryContainer = document.createElement("div");
const gallerySection = document.querySelector("#section--gallery");
galleryContainer.classList.add("gallery-container");
for (let i = 0; i < photoDescriptionArray.length; i++) {
  const photoElement = document.createElement("img");
  photoElement.src = `images/gallery-${i + 1}.jpg`;
  photoElement.alt = photoDescriptionArray[i];
  photoElement.classList.add("gallery-photo");
  galleryContainer.appendChild(photoElement);
}

// TESTIMONIALS
const testimonialPhotoDescription = [
  "man-in-black-button-up-shirt",
  "wearing-black-framed-eyeglasses",
  "woman-in-white-crew-neck-shirt-smiling",
];
const fragmentCustomerPhotos = document.createDocumentFragment();
const testimonialSectionPhotos = document.createElement("div");
testimonialSectionPhotos.classList.add("testimonials--photos", "flex-row");
for (let i = 0; i < testimonialPhotoDescription.length; i++) {
  const photoEl = document.createElement("img");
  photoEl.src = `images/customer-${i + 1}.jpg`;
  photoEl.id = `customer-${i + 1}`;
  photoEl.classList.add("customer-photo");
  photoEl.alt = testimonialPhotoDescription[i];
  testimonialSectionPhotos.appendChild(photoEl);
}
fragmentCustomerPhotos.appendChild(testimonialSectionPhotos);
testimonialPhotoSection.appendChild(fragmentCustomerPhotos);

fragmentPhotos.appendChild(galleryContainer);
gallerySection.appendChild(fragmentPhotos);

/* NAVIGATION */
const activeBtn = function (e) {
  const target = e.target;
  /* If user clicks on one of link 
  it will change the button colour and scroll to the correlating section*/
  if (target.nodeName === "A") {
    e.preventDefault();
    const previousActiveBtn = document.querySelector(".active-btn");
    if (previousActiveBtn !== null) {
      previousActiveBtn.classList.toggle("active-btn");
    }
    target.classList.add("active-btn");
    // Find the target section
    const selectedSectionString = `section--${target.textContent
      .split(" ")
      .join("")
      .toLowerCase()}`;
    const scrollDestination = document.querySelector(
      `#${selectedSectionString}`
    );
    const previousSelectedSection = document.querySelector(".active");
    // For the first click, if there was no previous section selected,
    // add 'active' state to the selected section
    if (previousSelectedSection === null) {
      scrollDestination.classList.add("active");
    } else {
      // For other clicks, the previous selected section has active class removed
      // add active class added to the selected section
      previousSelectedSection.classList.toggle("active");
      scrollDestination.classList.add("active");
    }
    //Scroll to section
    const activeSection = document.querySelector(".active");
    activeSection.scrollIntoView({
      behavior: "smooth",
    });
  }
};

navigationContainer.addEventListener("click", activeBtn);

/* ACCESSORIES */
/* When user clicks on "Add to Cart" it'll change to "Remove from Cart" ONLY if there is at least 1 quantity. */
const addRemoveQuantity = function (target) {
  const card = target.closest(".shop-card");
  const quantityInput = card.querySelector(".card--quantity");
  let currentQty = +quantityInput.value;
  if (target.classList.contains("plus-icon")) {
    //Adds one to quantity
    currentQty++;
  } else if (target.classList.contains("minus-icon") && currentQty > 0) {
    // Can only remove if there is at least 1 quantity
    //Deduct one from quantity
    currentQty--;
  }
  quantityInput.value = currentQty;
};

// ADD OR REMOVE QUANTITY BUTTON
const addRemoveCart = function (target) {
  const card = target.closest(".shop-card");
  if (
    target.innerText.startsWith("Add") &&
    +card.querySelector(".card--quantity").value > 0
  ) {
    // Turn button red if quantity is at least 1
    // Change text
    target.textContent = "Remove from Cart";
    target.style.backgroundColor = "#f03e3e";
  } else {
    // Turn button Green
    // Change text
    target.textContent = "Add to Cart";
    target.style.backgroundColor = "#74b816";
    card.querySelector(".card--quantity").value = 0; // Reset quantity value to 0
  }
};

const cardFunctions = function (e) {
  const target = e.target;
  if (
    target.classList.contains("plus-icon") ||
    target.classList.contains("minus-icon")
  ) {
    addRemoveQuantity(target);
  } else if (target.nodeName === "BUTTON") {
    addRemoveCart(target);
  }
};

accessoriesSection.addEventListener("click", cardFunctions);

/* SIGN UP */
const addEmail = function () {
  const currentEmail = document.querySelector(".sign-up--email").value;
  // If something has been entered in the email field, append
  // to body once clicked on the button
  if (currentEmail !== "") {
    const newEmail = document.createElement("li");
    newEmail.innerText = currentEmail;

    emailList.appendChild(newEmail);
    document.querySelector(".sign-up--email").value = ""; //clear field once entered
  }
};

signupAddbtn.addEventListener("click", addEmail);

let previousSelectedImage = null;
const displayTestimonial = function (e) {
  const target = e.target;
  if (target.nodeName === "IMG") {
    // Find image index and find correllating review container
    const photoIndex = target.id.charAt(target.id.length - 1);
    const testimonialIndex = `testimonial--${photoIndex}`;
    const testimonialReview = document.querySelector(`#${testimonialIndex}`);

    if (previousSelectedImage === null) {
      testimonialReview.classList.remove("hidden"); // If clicked for the first time, display review
      previousSelectedImage = testimonialReview;
    } else {
      previousSelectedImage.classList.add("hidden"); // If not first click, remove active review from previous click to hide and add active class to current click to display
      testimonialReview.classList.toggle("hidden");
      previousSelectedImage = testimonialReview;
    }
  }
};
testimonialSectionPhotos.addEventListener("click", displayTestimonial);
