function collapseMenu() {
    const menuItems = document.querySelectorAll(".menu-items>li");
    const menuContents = document.querySelectorAll(".menu-contents>section");

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", (event) => {
            event.preventDefault();
            
            for (let j = 0; j < menuContents.length; j++) {
                if (i === j) {
                    menuContents[j].classList.add("collapsed");

                    function deactivateSiblings (activeItem)  {
                        Array.prototype.filter.call(activeItem.parentNode.children, siblings => {
                            if(siblings !== activeItem){
                                siblings.classList.remove("active");
                            }
                        })
                    }
                    deactivateSiblings(menuItems[i]);

                    menuItems[i].classList.add("active");
                } else {
                    menuContents[j].classList.remove("collapsed");
                }
            }
        });
    }
}
collapseMenu();