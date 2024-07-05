const derivative = (expression: string): number => {
  const variable = expression.match(/[A-Z]/)

  if (!variable?.length) {
    return 0
  }
  else {
    return parseInt(expression.replace(variable[0], '')) || 1
  }
}

export default derivative