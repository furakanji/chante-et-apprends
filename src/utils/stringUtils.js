export const normalizeString = (str) => {
    return str
        .normalize("NFD") // Decompose accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric (optional, depends on strictness)
};

export const checkAnswer = (input, correct) => {
    return normalizeString(input) === normalizeString(correct);
};
