
import React from 'react'

function UserProfile({params}) {

  const { id } = React.use(params)

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <div>
            <h1>
                Profile
            </h1>
            <h1>
              Profile page
            </h1>
            <h1>
              {id}
            </h1>
        </div>
    </div>

  )
}

export default UserProfile