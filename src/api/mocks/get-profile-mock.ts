import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      email: 'johndoe@example.com',
      name: 'John Doe',
      phone: '554100000',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
