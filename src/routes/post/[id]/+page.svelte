<script lang="ts">
  import type { PageData } from "./$types";
  import type { PageProps } from "./$types";
  import { supabase } from "$lib/supabaseClient";
  import Seo from "$lib/components/SEO.svelte";
  let { data }: PageProps = $props();
  const post = $state(data.post);
  let genres = $state<{ id: number; name: string }[]>([]);
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
      class="prose prose-lg max-w-none
[&_ul]:list-disc [&_ul]:ml-6
[&_ol]:list-decimal [&_ol]:ml-6
[&_a]:text-purple [&_a]:underline [&_a]:hover:text-purple-dark
[&_strong]:text-purple-dark
[&_h1]:text-purple-dark [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
[&_h2]:text-purple-dark [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3
[&_h3]:text-purple-dark [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
[&_p]:text-gray-700 [&_p]:leading-relaxed
[&_blockquote]:border-l-4 [&_blockquote]:border-purple [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4
[&_code]:bg-gray-100 [&_code]:text-purple-dark [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
[&_pre]:bg-gray-100 [&_pre]:text-sm [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre_code]:text-purple-dark
[&_hr]:my-6 [&_hr]:border-gray-300
[&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-4
[&_figure]:my-4 [&_figure]:text-center
[&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-2
[&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-gray-300 [&_th]:text-left [&_th]:font-semibold [&_td]:border-b [&_td]:border-gray-200 [&_td]:py-2 [&_td]:pr-4
[&_small]:text-sm [&_small]:text-gray-500
[&_mark]:bg-yellow-200 [&_mark]:text-gray-900
[&_li]:mb-1
[&_kbd]:bg-gray-200 [&_kbd]:text-xs [&_kbd]:font-mono [&_kbd]:px-1 [&_kbd]:py-0.5 [&_kbd]:rounded
"
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
