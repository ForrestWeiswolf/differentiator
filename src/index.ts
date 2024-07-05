const derivative = (expression: string): string => {
  const variable = expression.match(/[A-Z]/)

  if (!variable?.length) {
    return '0'
  }
  else {
    return String(parseInt(expression.replace(variable[0], '')) || 1)
  }
}

export default derivative