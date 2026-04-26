import { imageUrl } from "@/redux/api/baseApi";

const getImageUrl = (url: string | undefined) => {
  return url
    ? url?.startsWith("http") || url?.startsWith("data:") || url?.startsWith("blob:")
      ? url
      : `${imageUrl}${url}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
};

export default getImageUrl;
