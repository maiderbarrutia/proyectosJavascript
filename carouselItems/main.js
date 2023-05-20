function knowledgeCarousel() {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const carouselItemsContainer = carouselWrapper.querySelector(".carousel");
    const carouselItems = carouselItemsContainer.querySelectorAll(".carousel-item");
    const previousButton = carouselWrapper.querySelector(".prev");
    const nextButton = carouselWrapper.querySelector(".next");

    const CAROUSEL_ITEMS_LENGTH = carouselItems.length;

    function visibleItemsPerPage (itemsPerPage){
        const ELEMENT_WIDTH = (100 / itemsPerPage);
        carouselItems.forEach(item =>{
                item.style.width = ELEMENT_WIDTH + "%";
                item.style.minWidth = ELEMENT_WIDTH + "%";
                item.style.maxWidth = ELEMENT_WIDTH + "%";
        });
    }

    function displayItems (showedItems) {
        const ITEMS_TO_SHOW = showedItems;
        carouselItems.forEach(function (carouselItem, index) {
            carouselItem.style.left = `${index * 100}%`;
        });
        let currentItem = 0;
        nextButton.addEventListener("click", function () {
            currentItem++;
            moveCarousel();
        });
          
        previousButton.addEventListener("click", function () {
            currentItem--;
            moveCarousel();
        });
          
        function moveCarousel() {
            if (currentItem < CAROUSEL_ITEMS_LENGTH - ITEMS_TO_SHOW) {
              nextButton.style.display = "block";
            } else {
              nextButton.style.display = "none";
            }
            if (currentItem > 0) {
              previousButton.style.display = "block";
            } else {
              previousButton.style.display = "none";
            }
            carouselItems.forEach(function (carouselItem) {
              carouselItem.style.transform = `translateX(-${currentItem * 100}%)`;
            });
        }
        previousButton.style.display = "none";
    }

    function itemsPerWindowWidth() {
        const WINDOW_WIDTH = window.innerWidth;
        let showedItems;
        if (WINDOW_WIDTH < 576) {
            showedItems = 1;
            displayItems(showedItems)
            visibleItemsPerPage(showedItems);
            
        } else if (WINDOW_WIDTH < 1200) {
            showedItems = 4;
            displayItems(showedItems)
            visibleItemsPerPage(showedItems)
        }
        else {
            showedItems = 8;
            displayItems(showedItems)
            visibleItemsPerPage(showedItems)
        }
    }
    itemsPerWindowWidth();
    window.addEventListener("resize", itemsPerWindowWidth);
}


knowledgeCarousel();