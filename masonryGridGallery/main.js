function filteringProjectItems() {
    const FILTER_ITEMS = document.querySelectorAll(".filter .filter-item");
    FILTER_ITEMS.forEach(item =>{
        item.addEventListener("click", (event) => {
            event.preventDefault();
            if (item.classList.contains("all")) {
                addActiveToSelectedFilter(item);
                showFilterSelectedProjects(item, event);
            } else if (item.classList.contains("graphicDesign")) {
                addActiveToSelectedFilter(item);
                showFilterSelectedProjects(item, event);
            }else if (item.classList.contains("webDeveloper")) {
                addActiveToSelectedFilter(item);
                showFilterSelectedProjects(item, event);
            }else if (item.classList.contains("webDesign")) {
                addActiveToSelectedFilter(item);
                showFilterSelectedProjects(item, event);
            }
        });
        function addActiveToSelectedFilter(item) {
            item.classList.add("active");
            deactivateSiblings(item);
            function deactivateSiblings (activeItem)  {
                Array.prototype.filter.call(activeItem.parentNode.children, siblings => {
                    if(siblings !== activeItem){
                        siblings.classList.remove("active");
                    }
                })
            }
        }
        function showFilterSelectedProjects(selectedItem, event) {
            const GRID_ITEMS = document.querySelectorAll(".gallery-content .item");
            GRID_ITEMS.forEach(item => {
                if (item.classList.contains(event.target.id) === selectedItem.classList.contains(event.target.id)) {
                item.classList.remove("hidden")
                }else{
                    if (event.target.id === "all") {
                        item.classList.remove("hidden");
                        console.log(event.target.id)
                    }else{
                        item.classList.add("hidden")
                    }
                    
                }
            })
        }
    })
}
filteringProjectItems();


function masonry(columns) {
    const GRID = document.querySelector("#masonry");
    const GRID_CONTAINER = GRID.parentNode;
    const GRID_ITEMS = document.querySelectorAll(".item");
    
    GRID.parentNode.removeChild(GRID);

    const MASONRY_CONTAINER = document.createElement('div');
    MASONRY_CONTAINER.setAttribute('id', 'masonry');
    MASONRY_CONTAINER.classList.add('masonry-layout', "columns-" + columns);
    GRID_CONTAINER.appendChild(MASONRY_CONTAINER);

    for (let i = 1; i <= columns; i++) {
        var COLUMN = document.createElement('div');
        COLUMN.classList.add("masonry-column-" + i);
        MASONRY_CONTAINER.appendChild(COLUMN);
    }

    let countColumn = 1;
    GRID_ITEMS.forEach(item =>{
        const EACH_COLUMN = document.querySelector(".masonry-column-" + countColumn);
        EACH_COLUMN.appendChild(item);
        countColumn = countColumn < columns ? countColumn + 1 : 1;
    });
    
};

function columsPerWindowWidth() {
    const WINDOW_WIDTH = window.innerWidth;
    let showedItems;
    if (WINDOW_WIDTH < 576) {
        showedItems = 1;
        masonry(showedItems);
        
    } else if (WINDOW_WIDTH < 1200) {
        showedItems = 2;
        masonry(showedItems);
    }
    else {
        showedItems = 3;
        masonry(showedItems);
    }
}

function selectMasonryOrGrid() {
    const GALLERY_TYPE = document.getElementById('masonry')
    if (GALLERY_TYPE !== null) {
        columsPerWindowWidth();
        window.addEventListener("resize", columsPerWindowWidth);
    }
}
selectMasonryOrGrid()
















