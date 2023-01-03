import { hashSync } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { AddressEntity } from "../entities/AddressEntity";
import { UserEntity } from "../entities/UserEntity";
import { IUserRequest, IUserResponse } from "../interfaces/userInterface";

export class UserService {
  static create = async (userData: IUserRequest): Promise<IUserResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const addressRepository = AppDataSource.getRepository(AddressEntity);

    userData.password = hashSync(userData.password, 10);

    const address = await addressRepository.save({ ...userData.address });
    const newUser = await userRepository.save({
      ...userData,
      address: address,
    });

    const user: IUserResponse = newUser;
    delete user.password;

    return user;
  };

  static readAll = async (): Promise<IUserResponse[]> => {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const users = await userRepository.find({ relations: { address: true } });

    return users;
  };

  static readById = async (id: string): Promise<IUserResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const user = await userRepository.find({
      where: { id },
      relations: { address: true },
    });

    return user[0];
  };

  static updateById = async (
    id: string,
    userData: Partial<IUserRequest>
  ): Promise<IUserResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const addressRepository = AppDataSource.getRepository(AddressEntity);

    const userUpdate = await userRepository.find({
      where: { id },
      relations: { address: true },
    });

    const addressUpdate = await addressRepository.findOneBy({
      id: userUpdate[0].address.id,
    });

    const address = userData.address;
    delete userData.address;

    const updatedAt = new Date();
    await userRepository.update(
      id,
      Object.assign(userUpdate[0]!, { ...userData, updatedAt: updatedAt })
    );
 
    const user = await userRepository.find({
      where: { id },
      relations: { address: true },
    });

    return user[0]!;
  };

  static deleteById = async (id: string): Promise<void> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const addressRepository = AppDataSource.getRepository(AddressEntity);

    const user = await userRepository.find({
      where: { id },
      relations: { address: true },
    });

    await userRepository.remove(user[0]!);
    await addressRepository.remove(user[0]!.address);
  };

  static profile = async(id: string): Promise<IUserResponse>=>{
    const userRepository = AppDataSource.getRepository(UserEntity);

    const user = await userRepository.findOne({where:{id}, relations:{vehicle: true}});

    return user!;
  }
}
