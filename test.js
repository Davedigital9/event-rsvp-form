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
                if (circleSteps[currentCircle]) {
                    circleSteps[currentCircle].classList.remove("active");
                }
                currentCircle--;
                if (circleSteps[currentCircle]) {
                    circleSteps[currentCircle].classList.add("active");
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (validateForm()) {
                    const currentStepElement = document.querySelector(`.step-${currentStep}`);
                    if (currentStepElement) {
                        currentStepElement.style.display = "none";
                    }
                    if (currentStep < 5) {
                        currentStep++;
                        if (circleSteps[currentCircle]) {
                            circleSteps[currentCircle].classList.remove("active");
                        }
                        currentCircle++;
                        if (circleSteps[currentCircle]) {
                            circleSteps[currentCircle].classList.add("active");
                        }
                    }
                    const newStepElement = document.querySelector(`.step-${currentStep}`);
                    if (newStepElement) {
                        newStepElement.style.display = "flex";
                    }
                }
            });
        }
    });
});