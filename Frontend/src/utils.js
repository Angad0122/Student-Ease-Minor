export const transformImagePath =(url)=>{
    const nomalizePath= url.replace(/\\/g,"/")

    const path = nomalizePath.replace("public/","")

    return `http://localhost:8000/${path}`
}