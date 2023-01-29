// different types of errors
// be sure that the catched object is an error object, we check if variable is an instance of Error
// if true: call message property
// else: stringify error message

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    return String(error)
  }