'use client'

import { Axios } from '@/axios/Axios'
import { UserTypes } from '@/types/Types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaLock, FaUnlock } from 'react-icons/fa'
import Spiner from '@/components/Spiner'

const Page = () => {
  const [users, setUsers] = useState<UserTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [viewBlocked, setViewBlocked] = useState(false)

  const [blockLoading, setBlockLoading] = useState(false)

  const getUsers = async () => {
    try {
      setLoading(true)
      const res = await Axios.get('user/get-users')
      setUsers(res.data.data)
    } catch  {
       toast.error('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  const toggleBlock = async (userId: string, blockStatus: boolean) => {
    setBlockLoading(true)
    try {
        if(!blockStatus){
          const res = await Axios.post('admin/block-user', {userId})

          toast.success(res.data.message)
        } else {
            const res = await Axios.post('admin/unblock-user', {userId})

            toast.success(res.data.message)
        }
      getUsers()
    } catch  {
       toast.error('Error updating block status')
    } finally {
      setBlockLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredUsers = users.filter((user) => user.isBlocked === viewBlocked)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"> الطلاب </h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setViewBlocked(false)}
          className={`px-4 py-2 rounded ${
            !viewBlocked ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Active Users
        </button>
        <button
          onClick={() => setViewBlocked(true)}
          className={`px-4 py-2 rounded ${
            viewBlocked ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Blocked Users
        </button>
      </div>

      {loading ? (
        <div className='flex items-center justify-center' > <Spiner /> </div>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-500"> لا يوجد طلاب </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded-xl shadow hover:shadow-md transition duration-300 bg-white"
            >
              <div className="mb-2">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <p><strong>الهاتف:</strong> {user.phone}</p>
              <p><strong>الصف:</strong> {user.level}</p>
              <p className={`font-medium ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </p>
              <button
                onClick={() => toggleBlock(user._id, user.isBlocked)}
                className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-white ${
                  user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
                disabled={blockLoading}
              >
                {user.isBlocked ? <FaUnlock /> : <FaLock />}
                {user.isBlocked ? `${blockLoading ? ' Loading...  ' : '  الغاء الحظر  '}` : ` ${blockLoading ? 'Loading...' : 'حظر'} `}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
