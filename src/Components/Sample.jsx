const handleClick = async (e) => {
  e.preventDefault()

  if (!name || !email || !password) {
      setFormError("Please fill in all the fields correctly")
      return
  }

  const { data, error } = await supabase
      .from('Register')
      .insert({ Name: name, Email: email, Password: password })
      .select()

  if (error) {
      console.log(error)
      setFormError(error.message || "An error occurred. Please try again.")
  }
  if (data) {
      console.log(data)
      setFormError(null)

      setName('')
      setEmail('')
      setPassword('')
  }
  navigate('/login')

}