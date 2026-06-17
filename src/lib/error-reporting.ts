/**
 * Error reporting utility.
 * Replace with Sentry, Datadog, or similar in production:
 *   import * as Sentry from "@sentry/nextjs";
 *   Sentry.captureException(error);
 */
export function reportError(error: unknown, context?: Record<string, unknown>) {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.error("[Error Report]", error, context);
    return;
  }

  // In production, send to your error reporting service
  // TODO: Replace with Sentry.captureException(error, { extra: context })
  console.error("[Error Report]", error, context);
}
