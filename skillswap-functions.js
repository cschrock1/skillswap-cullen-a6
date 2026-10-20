function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }
  return skills.filter((skill) => skill.category === category);
}

const skillswapFunctions = { filterSkillsByCategory };

if (typeof module !== "undefined" && module.exports) {
  module.exports = skillswapFunctions;
}

if (typeof window !== "undefined") {
  window.SkillSwapFunctions = skillswapFunctions;
}