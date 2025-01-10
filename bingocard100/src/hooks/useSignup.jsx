import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (formData) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://bingoproject-3.onrender.com/api/user/signup', {
      method: 'POST',
      body: formData
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      // update loading state
      setIsLoading(false)

      console.log('Account created successfully!')
    }
  }

  return { signup, isLoading, error }
}