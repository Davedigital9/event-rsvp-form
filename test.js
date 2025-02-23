document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".stp");
    const circleSteps = document.querySelectorAll(".step");
    const formInputs = document.querySelectorAll(".step-1 form input");
    const nextBtn = document.querySelectorAll(".next-stp");
    const prevBtn = document.querySelectorAll(".prev-stp");
    const sessionRadios = document.querySelectorAll("input[name='sessions']");
    const dietaryCheckboxes = document.querySelectorAll("input[name='dietary-restrictions']");

    let currentStep = 1;
    let currentCircle = 0;

    //circleSteps[0].classList.add("active");
    circleSteps[0].querySelector(".circle").classList.add("active");

    function validateForm() {
        let valid = true;

        // Validate form inputs on step 1
        if (currentStep === 1) {
            for (let i = 0; i < formInputs.length; i++) {
                if (!formInputs[i].value) {
                    valid = false;
                    formInputs[i].classList.add("err");
                    findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
                    console.log(`Input validation failed for: ${formInputs[i].id}`);
                } else {
                    formInputs[i].classList.remove("err");
                    findLabel(formInputs[i]).nextElementSibling.style.display = "none";
                }
            }
        }

        // Validate the session radio buttons on step 2
        if (currentStep === 2) {
            let sessionSelected = false;
            for (let i = 0; i < sessionRadios.length; i++) {
                if (sessionRadios[i].checked) {
                    sessionSelected = true;
                    break;
                }
            }
            if (!sessionSelected) {
                valid = false;
                sessionRadios[0].closest(".checkbox-group").classList.add("err");
                console.log("Session radio button validation failed");
            } else {
                sessionRadios[0].closest(".checkbox-group").classList.remove("err");
            }
        }

        // Validate the dietary restriction checkboxes on step 3
        if (currentStep === 3) {
            let dietarySelected = false;
            for (let i = 0; i < dietaryCheckboxes.length; i++) {
                if (dietaryCheckboxes[i].checked) {
                    dietarySelected = true;
                    break;
                }
            }
            if (!dietarySelected) {
                valid = false;
                dietaryCheckboxes[0].closest(".checkbox-group").classList.add("err");
                console.log("Dietary restriction checkbox validation failed");
            } else {
                dietaryCheckboxes[0].closest(".checkbox-group").classList.remove("err");
            }
        }

        console.log("Form validation result:", valid);
        return valid;
    }

    function findLabel(el) {
        const idVal = el.id;
        const labels = document.getElementsByTagName("label");
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor == idVal) return labels[i];
        }
    }

    function updateActiveCircle() {
        circleSteps.forEach((step, index) => {
            if (index === currentCircle) {
                step.classList.add("step-active");
                step.querySelector(".circle").classList.add("active");
            } else {
                step.classList.remove("step-active");
                step.querySelector(".circle").classList.remove("active");
            }
        });
    }

    function collectFormData() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const sessions = Array.from(document.querySelectorAll("input[name='sessions']:checked")).map(el => el.nextElementSibling.textContent).join(", ");
        const dateTime = document.getElementById("date-time").selectedOptions[0].textContent;
        const category = document.getElementById("category").selectedOptions[0].textContent;
        const dietaryRestrictions = Array.from(document.querySelectorAll("input[name='dietary-restrictions']:checked")).map(el => el.nextElementSibling.textContent).join(", ");
        const accessibilityRequirements = document.getElementById("accessibility-requirements").value;
        const otherSpecialRequest = document.getElementById("other-special-request").value;

        document.getElementById("review-name").textContent = name;
        document.getElementById("review-email").textContent = email;
        document.getElementById("review-phone").textContent = phone;
        document.getElementById("review-sessions").textContent = sessions;
        document.getElementById("review-date-time").textContent = dateTime;
        document.getElementById("review-category").textContent = category;
        document.getElementById("review-dietary-restrictions").textContent = dietaryRestrictions;
        document.getElementById("review-accessibility-requirements").textContent = accessibilityRequirements;
        document.getElementById("review-other-special-request").textContent = otherSpecialRequest;
    }

    steps.forEach((step) => {
        const nextBtn = step.querySelector(".next-stp");
        const prevBtn = step.querySelector(".prev-stp");
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                const currentStepElement = document.querySelector(`.step-${currentStep}`);
                if (currentStepElement) {
                    currentStepElement.style.display = "none";
                }
                currentStep--;
                const newStepElement = document.querySelector(`.step-${currentStep}`);
                if (newStepElement) {
                    newStepElement.style.display = "flex";
                }
                if (currentCircle > 0) {
                    currentCircle--;
                }
                updateActiveCircle();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", (event) => {
                event.preventDefault();
                console.log("Next button clicked");
                if (validateForm()) {
                    console.log("Form is valid");
                    const currentStepElement = document.querySelector(`.step-${currentStep}`);
                    if (currentStepElement) {
                        currentStepElement.style.display = "none";
                    }
                    if (currentStep < 5) {
                        currentStep++;
                        if (currentCircle < circleSteps.length - 1) {
                            currentCircle++;
                        }
                        updateActiveCircle();
                    }
                    const newStepElement = document.querySelector(`.step-${currentStep}`);
                    if (newStepElement) {
                        newStepElement.style.display = "flex";
                    }
                    if (currentStep === 4) {
                        collectFormData();
                    }
                } else {
                    console.log("Form validation failed");
                }
            });
        }
    });

    function submitRSVP() {
        const submitRSVP = document.querySelector(".submit-rsvp");
        submitRSVP.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("submitRSVP");
            collectFormData();
            const currentStepElement = document.querySelector(`.step-${currentStep}`);
            if (currentStepElement) {
                currentStepElement.style.display = "none";
            }
            currentStep++;
            const newStepElement = document.querySelector(`.step-${currentStep}`);
            if (newStepElement) {
                newStepElement.style.display = "flex";
            }
        });
    }
    
    updateActiveCircle();
    submitRSVP();
});