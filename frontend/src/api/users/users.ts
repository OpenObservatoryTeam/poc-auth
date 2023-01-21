import client from '../client'

export const getUsers = (token : string | null) => client.extend({headers: { 'Authorization' : "Bearer " + token}}).get('users/list').then(r => r.json<any>());