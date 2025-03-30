import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.config = config;
  }

  private getKey(request: NextRequest): string {
    // Use IP address as the key
    return request.ip || 'unknown';
  }

  private cleanupOldRequests(key: string): void {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const windowStart = now - this.config.windowMs;
    
    // Remove requests older than the window
    const recentRequests = timestamps.filter(timestamp => timestamp > windowStart);
    this.requests.set(key, recentRequests);
  }

  public isRateLimited(request: NextRequest): boolean {
    const key = this.getKey(request);
    this.cleanupOldRequests(key);

    const timestamps = this.requests.get(key) || [];
    const now = Date.now();

    // Add current request
    timestamps.push(now);
    this.requests.set(key, timestamps);

    // Check if we've exceeded the rate limit
    return timestamps.length > this.config.maxRequests;
  }
}

// Create rate limiter instance with default config
const rateLimiter = new RateLimiter({
  maxRequests: 100, // 100 requests
  windowMs: 60 * 1000, // per minute
});

export function rateLimit(request: NextRequest) {
  if (rateLimiter.isRateLimited(request)) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
  return null;
} 