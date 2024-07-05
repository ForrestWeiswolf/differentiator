const derivative = (expression: string): string => {
  expression = expression.replace(/ \+.+/, '')
  const variable = expression.match(/[A-Z]/)
  const [base, exponent] = expression.split('^')

  if (!variable?.length) {
    return '0'
  }
  else if (exponent) {
    return `${exponent}${variable[0]}`
  } else if (base === variable[0]){
    return '1'
  } else {
    return `${parseInt(base.replace(variable[0], '')) || 0}`
  }
}

export default derivative