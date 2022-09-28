/** Custom error handler for custom error messages */
export class CustomAPIError extends Error {
      constructor(message: string) {
            super(message)
      }
}