export const hasProperties = (obj: any): boolean => {
  if (typeof obj !== "object" || obj === null) {
    return false
  }

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (hasProperties(obj[key])) {
          return true
        }
      } else {
        return true
      }
    }
  }

  return false
}

export const getFromStringUnderObject = (path: any, obj: object = {}, separator = ".") => {
  const properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev: any, curr: any) => prev?.[curr], obj)
}
