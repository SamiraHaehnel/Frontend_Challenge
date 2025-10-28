<script lang="ts">
  import { supabase } from "$lib/supabaseClient";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let posts = $state<any[]>([]);
  let loading = $state(true);

  onMount(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, excerpt, date, genre_id, status_id")
      .order("date", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden der Posts:", error);
    } else {
      posts = data;
    }
    loading = false;
  });

  function openPost(id: number) {
    goto(`/dashboard/post/${id}`);
  }
</script>

{#if loading}
  <p>Lade Beiträge...</p>
{:else if posts.length === 0}
  <p>Keine Beiträge gefunden.</p>
{:else}
  <ul class="space-y-4">
    {#each posts as post}
      <div
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <h3 class="font-medium text-gray-900">{post.title}</h3>
              <span
                class="px-2 py-1 text-xs rounded-full {post.status ===
                'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'}"
              >
                {post.status_id}
              </span>
              <span
                class="px-2 py-1 text-xs rounded-full {post.genre_id ===
                'horror'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'}"
              >
                {post.genre_id}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">{post.excerpt}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span>{post.date}</span>
              <span>{post.views} Aufrufe</span>
              <span>{post.likes} Likes</span>
              <span>{post.dislikes} Dislikes</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </ul>
{/if}
