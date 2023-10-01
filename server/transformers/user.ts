import { UserPayload, type UserTransformer } from "~/types/user";
import { Transformer } from "../utils/transformer";

export const userTransformerSelect: UserTransformer = {
  username: true,
  email: true,
  profileImage: true,
  name: true,
  id: true,
};

// export const userTransformer = (rawData: UserPayload) =>
//   Transformer<UserTransformer>(rawData, userTransformerSelect);

export const userTransformer = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
    handle: '@' + user.username
  }
}
