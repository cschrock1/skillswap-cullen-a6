const skillCards = Array.from(document.querySelectorAll(".skill-card"));
const skills = skillCards.map((card) => ({
    category: card.dataset.category
}));
const categoryButtons = document.querySelectorAll(".category-filter");
const skillCount = document.getElementById("skill-count");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        const matchingSkills = new Set(
            window.SkillSwapFunctions.filterSkillsByCategory(skills, category)
        );

        skillCards.forEach((card, index) => {
            card.hidden = !matchingSkills.has(skills[index]);
        });
        categoryButtons.forEach((categoryButton) => {
            const isActive = categoryButton === button;
            categoryButton.classList.toggle("is-active", isActive);
            categoryButton.setAttribute("aria-pressed", String(isActive));
        });
        skillCount.textContent =
            `${matchingSkills.size} skill${matchingSkills.size === 1 ? "" : "s"} found.`;
    });
});

document.querySelectorAll(".skill-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const detailsId = button.getAttribute("aria-controls");
        const details = detailsId ? document.getElementById(detailsId) : null;

        if (!details) {
            throw new Error(`Skill details not found for button: ${detailsId}`);
        }

        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        button.textContent = isExpanded ? "More about this skill" : "Hide details";
        details.hidden = isExpanded;
    });
});

document.getElementById("cost-calculator-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const hourlyRate = document.getElementById("hourly-rate").valueAsNumber;
    const hours = document.getElementById("lesson-hours").valueAsNumber;
    const total = window.SkillSwapFunctions.calculateTotalCosts(hourlyRate, hours);
    document.getElementById("cost-calculator-result").textContent =
        `Total cost: $${total.toFixed(2)}`;
});