'use client'

import React from 'react'
import { UserGroupIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'

interface FriendActivity {
  id: string
  username: string
  profileImage?: string
  productName: string
  timestamp: string
}

// Mock data - in a real app this would come from an API
const mockFriendsActivity: FriendActivity[] = [
  {
    id: '1',
    username: 'sarah_j',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    productName: 'Nike Air Max',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    username: 'mike_tech',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    productName: 'Samsung Galaxy S24',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    username: 'emma_shop',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    productName: 'Apple Watch Series 9',
    timestamp: '5 hours ago'
  }
]

export default function FriendsActivity() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserGroupIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Friends' Activity</h2>
      </div>

      <div className="space-y-4">
        {mockFriendsActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {activity.profileImage ? (
              <img
                src={activity.profileImage}
                alt={activity.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            )}
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {activity.username}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Scanned {activity.productName}
              </p>
            </div>
            
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {activity.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 