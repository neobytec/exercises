import IUserDTO from "../dto/userdto.interface"

export default class UserModel {
    name: string

    constructor(name: string) {
        this.name = name
    }

    static createFromDTO(userDTO: IUserDTO): UserModel {
        return new UserModel(userDTO.name)
    }
}