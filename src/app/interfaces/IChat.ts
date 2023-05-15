export interface IChat{
    groupId: string,
    users: {
      email: string,
      userName: string  
    }[]
}