class Image{
    constructor(value, imageName, imageContent) {
        this.value = value;
        this.imageContent = imageContent;
        this.isShowed = false;
        this.imageUrl = 'img/' + imageName;
    }
  
    show() {
        this.isShowed = true;
    }
    doNotShow(){
        this.isShowed = false;
    }
}
class Slider{
    constructor(images) {
        this.images = images;
        this.showedImages = [];
        this.paintDefaultImage();
        this.setupEventListeners();
    }

    // Método para crear un elemento de imagen en el html
    createImage(){
        const htmlSliderItem =  document.querySelector('.slider-item');

        const htmlImage = document.createElement('img');
        htmlSliderItem.appendChild(htmlImage);
        return htmlImage
    }

    // Método para pintar la imagen predeterminada
    paintDefaultImage(){
        const defaultImg = this.showFirstImage();
        
        const htmlImage = this.createImage();
        console.log(htmlImage)

        htmlImage.src = defaultImg.imageUrl;


        this.showedImages.push(defaultImg);
        this.showNewContent(defaultImg.imageContent)
        this.images.forEach(image => {
            
            
            if (image !== defaultImg) {
                defaultImg.show()
            }
        });
    }

    // Método para obtener la primera imagen
    showFirstImage(){
        return this.images[0];
    }

    // Método para obtener la última imagen
    showLastImage(){
        return this.images[this.images.length-1];
    }

    // Método para configurar los event listeners de los botones de siguiente y anterior
    setupEventListeners() {
        const nextButton = document.getElementById('next');
        const prevButton = document.getElementById('prev');

        nextButton.addEventListener('click', event => {
            event.preventDefault();
            this.showNewImage(true);
        });

        prevButton.addEventListener('click', event => {
            event.preventDefault();
            this.showNewImage(false);
        });
    }

    // Método para encontrar la imagen seleccionada
    findSelectedImage(){
        return this.images.filter(image => image.isShowed);
    }

    // Método para encontrar la imagen siguiente
    findNextImage(currentImageValue){
        return this.images.find(image => image.value === currentImageValue + 1)
    }

    // Método para encontrar la imagen previa
    findPrevImage(currentImageValue){
        return this.images.find(image => image.value === currentImageValue - 1)
    }

    // Método para mostrar una nueva imagen (siguiente o previa)
    showNewImage(next){
        const htmlImage =  document.querySelector('.slider-item img');
        const currentImage = this.findSelectedImage()[0];
        const currentImageValue = currentImage.value;
        currentImage.doNotShow();
    
        // Encuentra la siguiente o anterior imagen en el array basada en el valor
        let newImage;
        if (next) {
            newImage = this.findNextImage(currentImageValue) || this.showFirstImage();
        } else {
            newImage = this.findPrevImage(currentImageValue) || this.showLastImage();
        }
    
        htmlImage.src = newImage.imageUrl;
        newImage.show();
        this.showNewContent(newImage.imageContent)
        // console.log(newImage.imageTitle)
    
        this.showedImages = [newImage];
    }

    // Método para mostrar un nuevo contenido (título y descripción) de la imagen
    showNewContent(content){
        const htmlImageContent =  document.querySelector('.slider-content');
        htmlImageContent.innerHTML = content;  
    }
}

// Función para obtener las imágenes desde la API
function fetchImagesFromAPI() {
    return fetch('http://localhost:3000/images')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.map(imageData => new Image(imageData.value, imageData.imageName, imageData.imageContent));
        })
        .catch(error => {
            console.error('Error al obtener las imágenes desde la API:', error);
            return [];
        });
}

// Función para iniciar el slider después de obtener las imágenes desde la API
function initSlider() {
    fetchImagesFromAPI()
        .then(images => {
            return new Slider(images);
        });
}

initSlider(); // Inicia el slider