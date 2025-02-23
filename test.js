document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".stp");
    const circleSteps = document.querySelectorAll(".step");
    const formInputs = document.querySelectorAll(".step-1 form input");
    const nextBtn = document.querySelectorAll(".next-stp");
    const prevBtn = document.querySelectorAll(".prev-stp");
    const formSidebarSteps = document.querySelectorAll(".step");

    let currentStep = 1;
    let currentCircle = 0;

    function validateForm() {
        let valid = true;
        for (let i = 0; i < formInputs.length; i++) {
            if (!formInputs[i].value) {
                valid = false;
                formInputs[i].classList.add("err");
                findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
            } else {
                formInputs[i].classList.remove("err");
                findLabel(formInputs[i]).nextElementSibling.style.display = "none";
            }
        }
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
                if (validateForm()) {
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
