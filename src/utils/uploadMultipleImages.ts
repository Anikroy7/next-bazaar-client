import envConfig from "../config/envConfig";

export const uploadMultipleImages = async (imageFiles: File[]) => {
    const imagesArray = [];
    const url = `https://api.imgbb.com/1/upload?key=${envConfig.uploadImageKey}`;

  
    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
  
      formData.append("image", imageFiles[i]);
  
      try {
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
  
        const imgData = await res.json();
  
        if (imgData.success) {
          imagesArray.push(imgData.data.display_url);
        } else {
          // console.error("Error from imgbb:", imgData.error.message);
        }
      } catch (err) {
        // console.error("Error uploading image:", err);
      }
    }
  
    // console.log("Uploaded images array:", imagesArray);
  
    return imagesArray;
  };
  
