import Auth from './Auth'
import env from './env'

export const getAll = async () => {
  let users = await fetch(`${env.API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
    }
  })
  users = await users.json()
  return users
}

export const getById = async id => {
  let user = await fetch(`${env.API_URL}/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
    }
  })
  user = await user.json()
  return user
}

export const create = async data => {
  let response = await fetch(`${env.API_URL}/user`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: data
  })
  response = await response.json()

  return response.id
}

export const update = async data => {
  let response = await fetch(`${env.API_URL}/user/${data.id}`, {
    method: 'patch',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: data
  })
  response = await response.json()

  return response.id
}

export const deleteById = async id => {
  let response = await fetch(`${env.API_URL}/user/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  })
  response = await response.json()

  return response
}
