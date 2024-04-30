export const transformImagePath = (url) => {
    if (!url) {
        return '';
    }

    const nomalizePath = url.replace(/\\/g, "/");
    const path = nomalizePath.replace("public/", "");
    return `http://localhost:8000/${path}`;
};
