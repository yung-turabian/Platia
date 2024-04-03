import { pb } from "$lib/pocketbase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  return {
    post: await pb.collection("vignettes").getFirstListItem(`id="${id}"`),
  };
};
