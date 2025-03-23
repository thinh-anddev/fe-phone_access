export const handleSubmission = async (
    image: File,
    nameImage: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const metadata = JSON.stringify({
        name: nameImage,
      });
      formData.append("pinataMetadata", metadata);
  
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
  
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      return resData;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const submitData = async (
    image: File | null,
    nameImage: string
  ): Promise<string | null> => {
    try {
      if (image) {
        const resData = await handleSubmission(image, nameImage);
        return `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${resData.IpfsHash}`;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  