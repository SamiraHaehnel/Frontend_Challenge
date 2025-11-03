<script lang="ts">
  import type { PageData } from "./$types";
  import type { PageProps } from "./$types";
  import { supabase } from "$lib/supabaseClient";
  import Seo from "$lib/components/SEO.svelte";
  let { data }: PageProps = $props();
  const post = $state(data.post);
  let genres = $state<{ id: number; name: string }[]>([]);
  console.log(post.genre?.name, "genre");
</script>

<Seo
  title={`${post.title} - Rekursiver Blog`}
  description={post.excerpt}
  url={`https://rekursiver-blog.de/post/${post.id}`}
  type="article"
/>

<section class="max-w-4xl mx-auto p-6 flex flex-col min-h-screen">
  <article class="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
    <header class="mb-6">
      <h1 class="text-4xl font-bold text-purple-dark p-2">
        {post.title}
      </h1>
      <div class="flex flex-wrap gap-3 text-sm text-gray-500">
        <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
          {post.genre?.name || "Unbekanntes Genre"}
        </span>
        <span>📅 {new Date(post.date).toLocaleDateString("de-DE")}</span>
      </div>
    </header>

    <div
      class="prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_a]:text-purple [&_a]:underline [&_a]:hover:text-purple-dark [&_strong]:text-purple-dark, [&_h3]:text-purple-dark [&_h3]:text-xl [&_p]:text-gray-700 [&_hr]:mb-6 [&_hr]:mt-6"
    >
      {@html post.content}
    </div>

    <footer
      class="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center"
    >
      <div>
        <p class="text-sm text-gray-600">
          ✍️ Geschrieben von: <strong
            >{post.user?.display_name || "Samira"}</strong
          >
        </p>
      </div>
    </footer>
  </article>
</section>
