import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  const username = await pb.collection("users").getOne(id);
  await pb.admins.authWithPassword("henrywandover@gmail.com", "Together811!");
  const base = await pb.collections.create({
    id: id,
    name: username,
    type: "base",
    listRule: "",
    viewRule: "",
    createRule: "user = @request.auth.id",
    schema: [
      {
        name: "message",
        type: "text",
        required: true,
        options: {
          nonEmpty: true,
        },
      },
      {
        name: "user",
        type: "relation",
        required: true,
        options: {
          nonEmpty: true,
          cascadeDelete: false,
        },
      },
    ],
  });
  return {
    post: await pb.collection("hendog4eva_chat").getFirstListItem(`id="${id}"`),
  };
};
