<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.png";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<Navbar />
<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
<Footer />
