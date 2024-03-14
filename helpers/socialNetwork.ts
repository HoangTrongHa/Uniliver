interface ShareOptions {
    url: string;
    title?: string;
    imageUrl?: string;
}
export const pushToShareLink = (social: string, options: ShareOptions) => {
    const { url, title, imageUrl } = options;

    const socialUrls: Record<string, string> = {
        vk: `https://vk.com/share.php?url=${encodeURIComponent(
            url
        )}&title=${encodeURIComponent(title || "")}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(
            url
        )}&text=${encodeURIComponent(title || "")}`,
        ok: `https://connect.ok.ru/offer?url=${encodeURIComponent(
            url
        )}&title=${encodeURIComponent(
            title || ""
        )}&imageUrl=${encodeURIComponent(imageUrl || "")}`,
    };

    return socialUrls[social] || null;
};
