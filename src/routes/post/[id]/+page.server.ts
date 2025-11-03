import { supabase } from "$lib/supabaseClient";
let genres: { id: number; name: string }[] = [];
export async function load({ params }) {
  const { id } = params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return { status: 404, error: new Error("Post nicht gefunden") };
  }
  return { post };
}
