<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore, loadUserData } from '$lib/stores/userStore.js';

  // Mock-Daten für das Dashboard
  const recentPosts = [
    {
      id: 1,
      title: "Mein erster Blog-Eintrag",
      excerpt: "Das ist ein kurzer Auszug aus meinem ersten Blog-Eintrag...",
      date: "2024-01-15",
      views: 245,
      likes: 12,
      dislikes: 100,
      status: "published"
    },
    {
      id: 2,
      title: "Tipps für besseres Schreiben",
      excerpt: "Hier teile ich meine besten Tipps für effektives Schreiben...",
      date: "2024-01-12",
      views: 189,
      likes: 8,
      dislikes: 15,
      status: "published"
    },
    {
      id: 3,
      title: "Entwurf: Die Zukunft des Bloggens",
      excerpt: "Wie ich die Weltherrschaft an mich reißen werde...",
      date: "2024-01-10",
      views: 0,
      likes: 0,
      dislikes: 0,
      status: "draft"
    }
  ];

  const recentComments = [
    {
      id: 1,
      postTitle: "Mein erster Blog-Eintrag",
      author: "Max Mustermann",
      content: "Sehr interessanter Artikel! Danke für die Tipps.",
      date: "2024-01-16",
      isApproved: true
    },
    {
      id: 2,
      postTitle: "Tipps für besseres Schreiben",
      author: "Anna Schmidt",
      content: "Kann ich nur bestätigen, diese Methoden funktionieren wirklich.",
      date: "2024-01-14",
      isApproved: false
    }
  ];

  const genreStats = [
    { genre: "Technologie", count: 8, percentage: 40 },
    { genre: "Lifestyle", count: 5, percentage: 25 },
    { genre: "Reisen", count: 4, percentage: 20 },
    { genre: "Kochen", count: 3, percentage: 15 }
  ];

  const totalStats = {
    totalPosts: 20,
    totalViews: 15420,
    totalLikes: 456,
    totalComments: 89
  };

  onMount(() => {
    loadUserData();
  });
</script>

<div class="min-h-screen bg-gray-50 p-6">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">
      Willkommen zurück, <span class="text-purple-600">{$userStore.display_name}</span>!
    </h1>
    <p class="text-gray-600">Organisiere dich und behalte dein Leben auf Band.</p>
  </div>

  <!-- Statistiken -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-100 text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Gesamte Posts</p>
          <p class="text-2xl font-semibold text-gray-900">{totalStats.totalPosts}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-green-100 text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Aufrufe</p>
          <p class="text-2xl font-semibold text-gray-900">{totalStats.totalViews.toLocaleString()}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-red-100 text-red-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Likes</p>
          <p class="text-2xl font-semibold text-gray-900">{totalStats.totalLikes}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Kommentare</p>
          <p class="text-2xl font-semibold text-gray-900">{totalStats.totalComments}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Neueste Blog-Einträge -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Deine neuesten Einträge</h2>
        <button class="text-purple-600 hover:text-purple-800 font-medium">Alle anzeigen</button>
      </div>
      
      <div class="space-y-4">
        {#each recentPosts as post}
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <h3 class="font-medium text-gray-900">{post.title}</h3>
                  <span class="px-2 py-1 text-xs rounded-full {post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    {post.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
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
      </div>
    </div>

    <!-- Neueste Kommentare -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Neueste Kommentare</h2>
        <button class="text-purple-600 hover:text-purple-800 font-medium">Alle anzeigen</button>
      </div>
      
      <div class="space-y-4">
        {#each recentComments as comment}
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between mb-2">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{comment.author}</p>
                <p class="text-xs text-gray-500">zu "{comment.postTitle}"</p>
              </div>
              <span class="px-2 py-1 text-xs rounded-full {comment.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                {comment.isApproved ? 'Durchweg positiv' : 'negativ'}
              </span>
            </div>
            <p class="text-sm text-gray-700 mb-2">{comment.content}</p>
            <p class="text-xs text-gray-500">{comment.date}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Genre-Statistiken und Toolbox -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
    <!-- Genre-Diagramm -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Deine Genre-Verteilung</h2>
      
      <div class="space-y-4">
        {#each genreStats as stat}
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{stat.genre}</span>
                <span class="text-sm text-gray-500">{stat.count} Posts</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-600 h-2 rounded-full" style="width: {stat.percentage}%"></div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Toolbox -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Toolbox</h2>
      
      <div class="grid grid-cols-2 gap-4">
        <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <svg class="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Neuer Post</span>
        </button>
        
        <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <svg class="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Analytics</span>
        </button>
        
        <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <svg class="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Einstellungen</span>
        </button>
        
        <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <svg class="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Entwürfe</span>
        </button>
      </div>
    </div>
  </div>
</div>