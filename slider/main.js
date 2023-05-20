function slider() {
    const sliderItems = document.querySelectorAll(".slider-item");
    const previousButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    const SLIDER_ITEMS_LENGTH = sliderItems.length;

    sliderItems.forEach(function (sliderItem, index) {
        sliderItem.style.left = `${index * 100}%`;
    });
    let currentItem = 0;
    nextButton.addEventListener("click", function () {
        currentItem++;
        moveSlider();
    });
        
    previousButton.addEventListener("click", function () {
        currentItem--;
        moveSlider();
    });
        
    function moveSlider() {
        if (currentItem < SLIDER_ITEMS_LENGTH - 1) {
            nextButton.style.display = "block";
        } else {
            nextButton.style.display = "none";
        }
        if (currentItem > 0) {
            previousButton.style.display = "block";
        } else {
            previousButton.style.display = "none";
        }
        sliderItems.forEach(function (sliderItem) {
            sliderItem.style.transform = `translateX(-${currentItem * 100}%)`;
        });
    }
    previousButton.style.display = "none";

}


slider();