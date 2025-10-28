<script lang="ts">
  const { label, image, description, hashtags } = $props();
</script>

<div
  class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm mx-auto mb-10"
>
  <a href="/about">
    <img
      class="w-full h-148 sm:h-156 md:h-164 object-cover rounded-t-lg"
      alt={label}
      src={image}
    />
  </a>
  <div class="p-5">
    <a href="/about">
      <h5
        class="mb-2 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
      >
        {label}
      </h5>
    </a>
    <p class="mt-1 text-xs sm:text-sm text-gray-500">
      {#each hashtags as tag}
        <span class="mr-1">#{tag}</span>
      {/each}
    </p>
    <p class="mb-3 text-sm sm:text-base font-normal text-gray-700">
      {description}
    </p>
    <a
      href="/about"
      class="w-full bg-purple-dark text-yellow-bright font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 flex justify-between items-center
              hover:bg-purple focus:ring-2 focus:ring-yellow-bright"
    >
      Read more
      <svg
        class="rtl:rotate-180 w-3.5 h-3.5 sm:w-4 sm:h-4 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>
