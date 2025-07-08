document.addEventListener("DOMContentLoaded", () => {
    const cardComponent = document.querySelector(".extension-cards")



    const cardLoader = async () => {
        const cardData = await axios.get("data.json")

        for (let i of cardData.data) {
            cardComponent.innerHTML +=
                `      
                    <div class="main-card">
                        <div class="card-desc">
                            <img src="${i.logo}" alt="">
                            <div class="description">
                                <h4 class="extension-heading">${i.name}</h4>
                                <p class="extension-desc">${i.description}</p>
                            </div>
                        </div>

                        <label class="switch">
                            <input type="checkbox" ${i.isActive ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                    `

        }



        const mainCards = document.querySelectorAll(".main-card")
        let mode = "active"

        // function for active button
        function activeDisplayAll() {
            mode = "active"
            for (const mainCard of mainCards) {
                const cardSwitch = mainCard.querySelector(".switch input")
                if (cardSwitch && cardSwitch.checked === false) {
                    mainCard.classList.add("main-card-inactive")
                } else {
                    mainCard.classList.remove("main-card-inactive")
                }
            }
        }

        // function for inactive button
        function inactiveDisplayAll() {
            mode = "inactive"
            for (const mainCard of mainCards) {
                const cardSwitch = mainCard.querySelector(".switch input")
                if (cardSwitch && cardSwitch.checked === true) {
                    mainCard.classList.add("main-card-inactive")
                } else {
                    mainCard.classList.remove("main-card-inactive")
                }
            }
        }

        // function for all button
        function allDisplay() {
            mode = "all"
            for (const mainCard of mainCards) {
                mainCard.classList.remove("main-card-inactive")
            }
        }

        // function for updating display when checkbox is triggered
        for (const mainCard of mainCards) {
            const cardSwitch = mainCard.querySelector(".switch input")

            function updateDisplay() {
                if (mode === "active") {
                    if (cardSwitch.checked === false) {
                        mainCard.classList.add("main-card-inactive")
                    }
                    else {
                        mainCard.classList.remove("main-card-inactive")
                    }
                }
                else if (mode === "inactive") {
                    if (cardSwitch.checked === true) {
                        mainCard.classList.add("main-card-inactive")
                    }
                    else {
                        mainCard.classList.remove("main-card-inactive")
                    }
                }
                // Do nothing if mode is "all"
            }

            if (cardSwitch) {
                cardSwitch.addEventListener("change", () => {
                    if (mode !== "all") {
                        updateDisplay()
                    }
                })
            }
        }

        const activeButton = document.querySelector("#active-button")
        activeButton.addEventListener("click", () => {
            activeDisplayAll()
        })

        const inactiveButton = document.querySelector("#inactive-button")
        inactiveButton.addEventListener("click", () => {
            inactiveDisplayAll()
        })

        const allButton = document.querySelector("#all-button")
        allButton.addEventListener("click", () => {
            allDisplay()
        })

        // console.dir(cardSwitch)

    }

    cardLoader()

})




