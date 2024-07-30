const API_KEY = UNSPLASH_API_KEY;
const maxImages = 4;
const API_ADDRESS = `https://api.unsplash.com/photos/random?count=${maxImages}&client_id=${API_KEY}`;
const parentElement = document.querySelector(".container");
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", async function generateImages() {
    parentElement.textContent = "";
    parentElement.style = `
        height: 512px;
        display: grid;
        font-size: 1rem;
    `;
    try {
        const response = await fetch(API_ADDRESS);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        const data = await response.json();
    
        data.forEach((imageData, index) => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("image-item");
            newDiv.id = `image-item-id-${index}`;
            parentElement.appendChild(newDiv);

            const imageElement = document.createElement("img");
            imageElement.src = imageData.urls.regular;
            imageElement.alt = imageData.alt_description;
            newDiv.appendChild(imageElement);

            const imageDetails = document.createElement("div");
            imageDetails.setAttribute("class", "image-details");

            const creator = document.createElement("p");
            creator.textContent = `Photo by `;

            const imageLink = document.createElement("a");
            imageLink.href = imageData.user.portfolio_url;
            imageLink.textContent = `${imageData.user.name}`;
            creator.appendChild(imageLink);

            imageDetails.appendChild(creator);

            newDiv.appendChild(imageDetails);
        });
    } catch (error) {
        console.log("An error occurred:", error);
    }
})

