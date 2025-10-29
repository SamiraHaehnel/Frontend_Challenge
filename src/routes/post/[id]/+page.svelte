<script lang="ts">
  import type { PageData } from "./$types";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const post = $state(data.post);
</script>

<section class="max-w-4xl mx-auto p-6 flex flex-col min-h-screen">
  <article class="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
    <header class="mb-6">
      <h1 class="text-4xl font-bold text-purple-dark p-2">
        {post.title}
      </h1>
      <div class="flex flex-wrap gap-3 text-sm text-gray-500">
        <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full"
          >{post.genre?.name || "Unbekanntes Genre"}</span
        >
        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full"
          >{post.status?.name || "Entwurf"}</span
        >
        <span>📅 {new Date(post.date).toLocaleDateString("de-DE")}</span>
      </div>
    </header>

    <div class="prose prose-lg max-w-none">
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
