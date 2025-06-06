// Helper Function to Set Attribute on DOM e
function setAttributes(element, attributes) {
    for (const key in attributes) {
       element.setAttribute(key, attributes[key]);

    }
}

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



// Create Elements for links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        totalImages = photosArray.length;
        
//  Create <a> to link to Unsplash
const item = document.createElement('a');

setAttributes(item, {
    href: photo.links.html,
    target: '_blank',
});

// Create image for photo
const img = document.createElement('img');
  
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // Event Listner, chaek when each is finished loading 
    img.addEventListener('load', imageLoaded);
    // Put the <img> inside <a>, then put both inside the imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'v8S-kZQs4VQTJ4Iqs2km2sMo5aMeTDIaKvbS1PsGoDs';
const apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;
//  Check if all images were loaed
function imageLoaded() {
    
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
      
    }
}
// Get photos form Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here

    }
    
}
// Check to see if scroling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// On load
getPhotos();