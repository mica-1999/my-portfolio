/**
 * Validates if a string is a properly formatted URL
 * @param url The URL string to validate
 * @returns Boolean indicating if the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        console.error("Invalid URL:", e);
        return false;
    }
};

/**
 * Additional software form utility functions can be added here
 */
