import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";
import { POCKETBASE_PASSWORD, POCKETBASE_USERNAME } from "$env/static/private";

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  await pb.admins.authWithPassword(POCKETBASE_USERNAME, 
    POCKETBASE_PASSWORD);
  const user = await pb.collection("users").getOne(id);
  try {
    const collection = await pb.collections.getFirstListItem(`id="${id}"`);
  } catch (ClientResponseError) {
    const base = await pb.collections.create({
      id: id, 
      name: user.name + "_chat_responses",
      type: 'base',
      schema: [
          {
              name: 'message',
              type: 'text',
              required: true,
              options: {
                  min: 10,
              },
          },
          {
              name: 'user',
              type: 'relation',
          },
      ],
    });
  }
  return {
    post: await pb.collections.getFirstListItem(`id="${id}"`)
  };
};
