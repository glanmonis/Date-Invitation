// ========================================
// GLOBAL VARIABLES
// ========================================

let selectedDate = "";
let selectedTime = "";
let selectedPlace = "";
let selectedVibe = "";
let selectedPickup = "";
let selectedPickupLocation = "";


// ========================================
// DOM READY
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const music = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");

    const yesButton = document.getElementById("btn-yes");
    const noButton = document.getElementById("btn-no");

    const dateInput = document.getElementById("date-input");
    const timeInput = document.getElementById("time-input");

    const customPlaceInput =
        document.getElementById("custom-place");

    const customLocationBtn =
        document.getElementById("custom-location-btn");

    const paymentButton =
        document.getElementById("paymentButton");

    const notifyButton =
        document.getElementById("notifyButton");

    const whatsappButton =
        document.getElementById("whatsappButton");

    const pickupLocationGroup =
        document.getElementById("pickup-location-group");

    const pickupLocationInput =
        document.getElementById("pickup-location");


    // ========================================
    // SCREEN NAVIGATION
    // ========================================

    function switchScreen(nextId) {

        const currentScreen =
            document.querySelector(".screen.active");

        const nextScreen =
            document.getElementById(nextId);

        if (!nextScreen) {
            console.error("Screen not found:", nextId);
            return;
        }

        if (currentScreen) {
            currentScreen.classList.remove("active");
            currentScreen.classList.add("hidden");
        }

        nextScreen.classList.remove("hidden");
        nextScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ========================================
    // MUSIC
    // ========================================

    music.volume = 0.35;


    yesButton.addEventListener("click", () => {

        music.play()
            .then(() => {
                musicToggle.textContent = "🔊";
            })
            .catch(error => {
                console.log(
                    "Music could not start:",
                    error
                );
            });

        switchScreen("screen-2");
    });


    musicToggle.addEventListener("click", () => {

        if (music.paused) {

            music.play()
                .then(() => {
                    musicToggle.textContent = "🔊";
                })
                .catch(error => {
                    console.log(
                        "Music could not start:",
                        error
                    );
                });

        } else {

            music.pause();
            musicToggle.textContent = "🔇";

        }

    });


    // ========================================
    // NO BUTTON - DODGE
    // ========================================

    function moveNoButton() {

        const buttonWidth =
            noButton.offsetWidth;

        const buttonHeight =
            noButton.offsetHeight;

        const maxX =
            window.innerWidth - buttonWidth - 20;

        const maxY =
            window.innerHeight - buttonHeight - 20;

        const randomX =
            Math.floor(Math.random() * Math.max(maxX, 20));

        const randomY =
            Math.floor(Math.random() * Math.max(maxY, 20));

        noButton.style.position = "fixed";
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
        noButton.style.zIndex = "99999";
    }


    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );


    noButton.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            moveNoButton();

        }
    );


    // ========================================
    // DATE VALIDATION
    // ========================================

    const today = new Date();

    const tomorrow = new Date(today);

    tomorrow.setDate(
        today.getDate() + 1
    );

    const maxDate = new Date(tomorrow);

    maxDate.setDate(
        tomorrow.getDate() + 30
    );


    function formatDate(date) {

        const year =
            date.getFullYear();

        const month =
            String(date.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(date.getDate())
                .padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    dateInput.min =
        formatDate(tomorrow);

    dateInput.max =
        formatDate(maxDate);


        
    // ========================================
    // STANDARD NEXT BUTTONS
    // ========================================

    document.querySelectorAll(".next-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const nextScreen =
                        button.dataset.next;

                    if (!nextScreen) {
                        return;
                    }


                    // --------------------------------
                    // SCREEN 3 VALIDATION
                    // --------------------------------

                    if (
                        button.closest("#screen-3")
                    ) {

                        if (!dateInput.value) {

                            alert(
                                "Please choose a date 🗓"
                            );

                            return;
                        }


                        if (!timeInput.value) {

                            alert(
                                "Please choose a time ⌚"
                            );

                            return;
                        }


                        selectedDate =
                            dateInput.value;

                        selectedTime =
                            timeInput.value;
                    }


                    // --------------------------------
                    // SCREEN 6
                    // --------------------------------

                    if (
                        button.closest("#screen-6")
                    ) {

                        console.log(
                            "Final Date Details:",
                            {
                                date: selectedDate,
                                time: selectedTime,
                                place: selectedPlace,
                                vibe: selectedVibe
                            }
                        );
                    }


                    switchScreen(nextScreen);

                }
            );

        });


    // ========================================
    // SCREEN 4 - LOCATION SELECTION
    // ========================================

    document.querySelectorAll(
        "#screen-4 .location-item"
    ).forEach(item => {

        item.addEventListener(
            "click",
            () => {

                selectedPlace =
                    item.dataset.location;

                localStorage.setItem(
                    "selectedPlace",
                    selectedPlace
                );

                const nextScreen =
                    item.dataset.next || "screen-5";

                switchScreen(nextScreen);

            }
        );

    });


    // ========================================
    // CUSTOM LOCATION
    // ========================================

    customPlaceInput.addEventListener(
        "input",
        () => {

            if (
                customPlaceInput.value.trim() !== ""
            ) {

                customLocationBtn.classList.add(
                    "show"
                );

            } else {

                customLocationBtn.classList.remove(
                    "show"
                );

            }

        }
    );


    customLocationBtn.addEventListener(
        "click",
        () => {

            const customLocation =
                customPlaceInput.value.trim();


            if (customLocation === "") {

                alert(
                    "Please enter a place 📍"
                );

                return;
            }


            selectedPlace =
                customLocation;


            localStorage.setItem(
                "selectedPlace",
                selectedPlace
            );


            switchScreen("screen-5");

        }
    );


    // ========================================
    // SCREEN 5 - VIBE SELECTION
    // ========================================

    document.querySelectorAll("input[name='pickup']")
        .forEach(radio => {
            radio.addEventListener("change", () => {
                const needsPickup = radio.value === "Yes";
                pickupLocationGroup.hidden = !needsPickup;
                pickupLocationInput.required = needsPickup;

                if (!needsPickup) {
                    pickupLocationInput.value = "";
                }
            });
        });

    document.querySelectorAll(
        "#screen-5 .food-item"
    ).forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const pickupChoice =
                    document.querySelector("input[name='pickup']:checked");

                if (!pickupChoice) {
                    alert("Please choose whether you need a pickup 🚲");
                    return;
                }

                selectedVibe =
                    item.dataset.food;

                selectedPickup =
                    pickupChoice.value;

                selectedPickupLocation =
                    pickupChoice.value === "Yes"
                        ? pickupLocationInput.value.trim()
                        : "Not needed";

                if (pickupChoice.value === "Yes" && !selectedPickupLocation) {
                    alert("Please enter your pickup location 📍");
                    pickupLocationInput.focus();
                    return;
                }


                localStorage.setItem(
                    "selectedVibe",
                    selectedVibe
                );






                const datePlan = {
                    date: selectedDate,
                    time: selectedTime,
                    place: selectedPlace,
                    vibe: selectedVibe,
                    pickup: selectedPickup,
                    pickupLocation: selectedPickupLocation,
                    confirmed: true
                    // confirmed: false

                };

                localStorage.setItem(
                    "datePlan",
                    JSON.stringify(datePlan)
                );


                // Update confirmation screen

                document.getElementById(
                    "summary-date"
                ).textContent =
                    formatReadableDate(
                        selectedDate
                    );


                document.getElementById(
                    "summary-time"
                ).textContent =
                    selectedTime;

                document.getElementById(
                    "ready-time"
                ).textContent =
                    getReadyTime(selectedTime);


                document.getElementById(
                    "summary-place"
                ).textContent =
                    selectedPlace;


                document.getElementById(
                    "summary-vibe"
                ).textContent =
                    selectedVibe;

                document.getElementById(
                    "summary-pickup"
                ).textContent =
                    selectedPickup;

                document.getElementById(
                    "summary-pickup-location"
                ).textContent =
                    selectedPickupLocation;


                switchScreen("screen-6");

            }
        );

    });


    // ========================================
    // FORMAT DATE
    // ========================================

    function formatReadableDate(dateString) {

        if (!dateString) {
            return "---";
        }

        const date =
            new Date(dateString + "T00:00:00");


        return date.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }

    function getReadyTime(timeString) {
        const timeParts = timeString.match(
            /^(\d{1,2}):(\d{2})\s(AM|PM)$/
        );

        if (!timeParts) {
            return timeString;
        }

        let hours = Number(timeParts[1]);
        const minutes = Number(timeParts[2]);
        const meridiem = timeParts[3];

        if (meridiem === "PM" && hours !== 12) {
            hours += 12;
        }

        if (meridiem === "AM" && hours === 12) {
            hours = 0;
        }

        let totalMinutes = hours * 60 + minutes - 30;

        if (totalMinutes < 0) {
            totalMinutes += 24 * 60;
        }

        hours = Math.floor(totalMinutes / 60);
        const readyMinutes = totalMinutes % 60;
        const readyMeridiem = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;

        return `${displayHours}:${String(readyMinutes).padStart(2, "0")} ${readyMeridiem}`;
    }


    // ========================================
    // PAYMENT
    // ========================================

    if (paymentButton) {

        paymentButton.addEventListener(
            "click",
            () => {

                alert(
                    "😂 Nice try! The $499 fee is completely fake. Your date is confirmed! ❤️"
                );

                switchScreen("screen-8");

            }
        );

    }


    // ========================================
    // FINAL NOTIFICATION
    // ========================================

    if (notifyButton) {

        notifyButton.addEventListener(
            "click",
            () => {

                const recipientEmail = "glanpritheshmonis@gmail.com";
                const message = [
                    "💕 Date confirmed!",
                    `Date: ${formatReadableDate(selectedDate)}`,
                    `Time: ${selectedTime}`,
                    `Place: ${selectedPlace}`,
                    `Vibe: ${selectedVibe}`,
                    `Pickup: ${selectedPickup}`,
                    `Pickup location: ${selectedPickupLocation}`
                ].join("\n");

                const mailtoUrl =
                    `mailto:${recipientEmail}?subject=${encodeURIComponent("Date confirmed 💕")}&body=${encodeURIComponent(message)}`;

                window.location.href = mailtoUrl;

            }
        );

    }

    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            () => {

                const phoneNumber = "917483350411"; // Replace with your phone number in international format without '+' or dashes
                const message = [
                    "💕 Date confirmed!",
                    `Date: ${formatReadableDate(selectedDate)}`,
                    `Time: ${selectedTime}`,
                    `Place: ${selectedPlace}`,
                    `Vibe: ${selectedVibe}`,
                    `Pickup: ${selectedPickup}`,
                    `Pickup location: ${selectedPickupLocation}`
                ].join("\n");

                const whatsappUrl =
                    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

                window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            }
        );

    }

});
const savedPlan = JSON.parse(localStorage.getItem("datePlan"));

if (savedPlan) {
    selectedDate = savedPlan.date;
    selectedTime = savedPlan.time;
    selectedPlace = savedPlan.place;
    selectedVibe = savedPlan.vibe;
    selectedPickup = savedPlan.pickup || "";
    selectedPickupLocation = savedPlan.pickupLocation || "";
}