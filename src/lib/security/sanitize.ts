/**
 * Sanitizes a string by removing potentially dangerous HTML/script tags
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous attributes
  sanitized = sanitized.replace(/on\w+="[^"]*"/g, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/g, '');
  
  // Remove JavaScript protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data protocol
  sanitized = sanitized.replace(/data:/gi, '');
  
  // Remove vbscript protocol
  sanitized = sanitized.replace(/vbscript:/gi, '');
  
  // Remove expression protocol
  sanitized = sanitized.replace(/expression:/gi, '');
  
  return sanitized;
}

/**
 * Sanitizes an object by recursively sanitizing all string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]);
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes an email address
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  
  // Sanitize the email
  return sanitizeInput(email.toLowerCase().trim());
}

/**
 * Validates and sanitizes a URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  try {
    const parsedUrl = new URL(url);
    // Only allow specific protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return parsedUrl.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
} 