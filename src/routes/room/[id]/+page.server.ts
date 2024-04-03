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
      system: false,
      schema: [
          {
              system: false,
              name: 'message',
              type: 'text',
              required: true,
              presentable: false,
              unique: false,
              options: {
                  min: null,
                  max: null,
                  pattern: ""
              }
          },
          {
            system: false,
            name: 'user',
            type: 'relation',
            "required": true,
            "presentable": false,
            "unique": false,
            "options": {
              "collectionId": "_pb_users_auth_",
              "cascadeDelete": false,
              "minSelect": null,
              "maxSelect": 1,
              "displayFields": null
            }
          }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "user = @request.auth.id",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    });
  }
  return {
    post: await pb.collections.getFirstListItem(`id="${id}"`)
  };
};
