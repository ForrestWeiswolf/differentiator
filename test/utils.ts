export const checkEqualityAndPrint = <T>(actual: T, expected: T, context?: string) => {
  if(actual !== expected){
    console.log(`Expected ${expected} but got ${actual}${context && ` (${context})`}`)
    return false
  } else {
    return true
  }
}