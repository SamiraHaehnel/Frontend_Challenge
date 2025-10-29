<script lang="ts">
  export let title: string = "Standardtitel deiner Seite";
  export let description: string = "Standardbeschreibung deiner Seite.";
  export let keywords: string = "";
  export let image: string = "";
  export let url: string = "";
  export let type: string = "website";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  {#if image}
    <meta property="og:image" content={image} />
  {/if}
  {#if url}
    <meta property="og:url" content={url} />
  {/if}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if image}
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
