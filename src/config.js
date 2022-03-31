// Server related configuration.
export const BASE_URL_SERVER = "http://localhost:5000";

// Conpany realted configuration.
const COUNTRY_CODE = "+91 ";
export const BRAND_NAME = "Con Holistic";
export const SITE_ADDRESS = "Shyamnagar, 743128";
export const SITE_PHONE = COUNTRY_CODE + "7003257593";
export const SITE_EMAIL = "conholistic@gmail.com";

// Social media links
export const FACEBOOK_LINK = "https://www.facebook.com/profile.php?id=100005035156254";
export const INSTAGRAM_LINK = "https://www.instagram.com/singh.rohitsingh2k/";
export const TWITTER_LINK = "https://twitter.com/RohitSi46316266";
export const PINTEREST_LINK = "https://in.pinterest.com/singhrohitsingh2k";

// Common css
export const NoStyle = {
  color: "inherit",
};

// Some CDN images
const DEFAULT_LOGIN_IMAGE = "https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const CUSTOM_LOGIN_IMAGE = BASE_URL_SERVER + '/products/1648634597910-IMG-20220329-WA0011.jpg'
export const LOGIN_BACKGROUND_IMAGE_URL = CUSTOM_LOGIN_IMAGE || DEFAULT_LOGIN_IMAGE;

const DEFAULT_REGISTER_IMAGE = "https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
const CUSTOM_REGISTER_IMAGE = BASE_URL_SERVER + '/products/1648634597910-IMG-20220329-WA0011.jpg'
export const REGISTER_BACKGROUND_IMAGE_URL = CUSTOM_REGISTER_IMAGE || DEFAULT_REGISTER_IMAGE;

export const DEFAULT_PRODUCT_IMAGE_URL = BASE_URL_SERVER + '/products/1648693158799-default-product-image.png'
