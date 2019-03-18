export default (url) =>{
    return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            resolve({
                width: image.width,
                height: image.height
            });
        };
    });
}