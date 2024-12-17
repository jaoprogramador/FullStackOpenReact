import { useQuery } from '@apollo/client'
import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './graphql/queries'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons = {result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App