// src/utils/imageCache.js
const IMAGE_CACHE_PREFIX = 'intube_cache_';
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB max cache size

/**
 * Converts an image URL to a Base64 string using browser APIs
 */
export const imageToBase64 = async (imageUrl) => {
  try {
    // For local assets, we need to handle them differently in Vite
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to Base64:', error);
    return null;
  }
};

/**
 * Caches an image in localStorage
 */
export const cacheImage = async (key, imageUrl) => {
  try {
    // Check if we have enough space
    if (!hasEnoughStorage()) {
      // If not enough space, clear some old caches
      clearOldestCache();
    }
    
    const base64Image = await imageToBase64(imageUrl);
    if (base64Image) {
      localStorage.setItem(`${IMAGE_CACHE_PREFIX}${key}`, JSON.stringify({
        data: base64Image,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to cache image:', error);
    return false;
  }
};

/**
 * Gets a cached image from localStorage
 */
export const getCachedImage = (key) => {
  try {
    const cachedItem = localStorage.getItem(`${IMAGE_CACHE_PREFIX}${key}`);
    if (cachedItem) {
      const { data } = JSON.parse(cachedItem);
      return data;
    }
    return null;
  } catch (error) {
    console.error('Failed to get cached image:', error);
    return null;
  }
};

/**
 * Check if we have enough storage space
 */
const hasEnoughStorage = () => {
  try {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        totalSize += localStorage.getItem(key)?.length || 0;
      }
    }
    
    // localStorage size is measured in char length - roughly 2 bytes per char
    return totalSize * 2 < MAX_CACHE_SIZE;
  } catch (error) {
    console.error('Error checking storage:', error);
    return false;
  }
};

/**
 * Clear the oldest cached image
 */
const clearOldestCache = () => {
  try {
    let oldestKey = null;
    let oldestTime = Infinity;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (item.timestamp < oldestTime) {
            oldestTime = item.timestamp;
            oldestKey = key;
          }
        } catch (e) {
          console.log("invalid items",e)
        }
      }
    }
    
    if (oldestKey) {
      localStorage.removeItem(oldestKey);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error clearing oldest cache:', error);
    return false;
  }
};

/**
 * Precache important images for offline use
 */
export const precacheImportantImages = async () => {
  try {
    // Import images directly - this ensures they're bundled with your app
    // and available offline through the browser cache
    const noInternetImage = new URL('../assets/noInternetConnection.png', import.meta.url).href;
    const notFoundImage = new URL('../assets/404.png', import.meta.url).href;
    
    // List of key error/offline images to cache
    const criticalImages = [
      { key: 'noInternet', url: noInternetImage },
      { key: '404', url: notFoundImage },
      // Add other critical images here
    ];
    
    for (const img of criticalImages) {
      await cacheImage(img.key, img.url);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to precache images:', error);
    return false;
  }
};

/**
 * Clear all cached images
 */
export const clearImageCache = () => {
  try {
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(IMAGE_CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to clear image cache:', error);
    return false;
  }
};