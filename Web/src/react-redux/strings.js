// Returns application strings based on language
const tempLangVar = "EN";

// Maps strings to containers/components
function ApplicationStringsGenerate(lang) {
    if (lang === "FR") {
        return {};
    }

    return {
        head: {
            title: ""
        }
    };
}

export default ApplicationStringsGenerate(tempLangVar);
