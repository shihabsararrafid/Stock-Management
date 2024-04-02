export const checkUniqueness = async (value: object) => {
  const res = await fetch('/api/auth/verify', {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  if (res.ok) {
    return null
  } else return 'Unique Constraint Failed'
}
