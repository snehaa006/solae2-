/* Sample images for the component stories. */
const base = import.meta.env.BASE_URL;
export const stickerSrc = (name: string) => `${base}img/stickers/${name}.webp`;
export const photoSrc = (id: string, w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
