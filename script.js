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