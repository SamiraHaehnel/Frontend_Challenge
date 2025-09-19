<script>
  let title = "Willkommen bei CAT DND!";
  let subtitle = "Welchen Character möchtest du bei deiner nächsten Session spielen? ^^";
</script>

<header>
  <section 
    class="relative min-h-screen flex flex-col items-center justify-center text-center 
           bg-gradient-to-br from-purple-900 via-purple-700 to-purple-900 
           text-yellow-300 overflow-hidden"
  >
    <!-- Content -->
    <div class="max-w-3xl p-6 animate-fadeInUp">
      <h1 class="text-6xl font-bold tracking-tight mb-4 drop-shadow-xl animate-bounceSlow">
        {title}
      </h1>
      <p class="text-xl text-purple-200 mb-8">
        {subtitle}
      </p>
      <button
        class="px-6 py-3 rounded-2xl bg-yellow-300 text-purple-900 font-semibold 
               hover:scale-110 hover:rotate-2 transition-transform duration-300 shadow-xl"
        on:click={() => window.location.href = '/cats'}
      >
        Mehr über meine Katzen
      </button>
    </div>

    <!-- Mama Cat -->
    <div class="absolute bottom-14 left-0 w-52 animate-catWalk">
      <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Glow -->
        <circle cx="130" cy="100" r="70" fill="gold" opacity="0.2" class="animate-glow"/>
        <!-- Tail -->
        <path d="M40 120 q-40 -50 -25 -90" stroke="#f5c6a5" stroke-width="12" fill="none" class="animate-tailWag"/>
        <!-- Body -->
        <ellipse cx="100" cy="130" rx="60" ry="38" fill="#f5c6a5" stroke="#333" stroke-width="3"/>
        <ellipse cx="100" cy="135" rx="58" ry="22" fill="#ffe5cf"/>
        <!-- Legs -->
        <circle cx="70" cy="165" r="12" fill="#f5c6a5" stroke="#333" stroke-width="2" class="animate-pawL"/>
        <circle cx="130" cy="165" r="12" fill="#f5c6a5" stroke="#333" stroke-width="2" class="animate-pawR"/>
        <!-- Head -->
        <circle cx="150" cy="90" r="40" fill="#f5c6a5" stroke="#333" stroke-width="3"/>
        <!-- Ears -->
        <polygon points="125,65 115,40 140,55" fill="#f5c6a5" stroke="#333" stroke-width="2"/>
        <polygon points="175,65 185,40 160,55" fill="#f5c6a5" stroke="#333" stroke-width="2"/>
        <polygon points="128,60 118,45 138,55" fill="pink"/>
        <polygon points="172,60 182,45 162,55" fill="pink"/>
        <!-- Eyes -->
        <ellipse cx="138" cy="90" rx="7" ry="10" fill="black" class="animate-blink"/>
        <ellipse cx="162" cy="90" rx="7" ry="10" fill="black" class="animate-blink"/>
        <circle cx="136" cy="88" r="2" fill="white"/>
        <circle cx="160" cy="88" r="2" fill="white"/>
        <!-- Nose -->
        <circle cx="150" cy="108" r="5" fill="pink"/>
        <!-- Mouth -->
        <path d="M150 113 q-8 6 -15 0" stroke="#333" stroke-width="2" fill="none"/>
        <path d="M150 113 q8 6 15 0" stroke="#333" stroke-width="2" fill="none"/>
        <!-- Whiskers -->
        <line x1="118" y1="108" x2="90" y2="102" stroke="#333" stroke-width="2"/>
        <line x1="118" y1="113" x2="90" y2="113" stroke="#333" stroke-width="2"/>
        <line x1="182" y1="108" x2="210" y2="102" stroke="#333" stroke-width="2"/>
        <line x1="182" y1="113" x2="210" y2="113" stroke="#333" stroke-width="2"/>
        <!-- Hearts & Notes -->
        <g class="animate-hearts">
          <circle cx="135" cy="60" r="6" fill="pink"/>
          <circle cx="150" cy="40" r="5" fill="pink"/>
          <circle cx="165" cy="55" r="6" fill="pink"/>
        </g>
        <g class="animate-notes">
          <text x="175" y="50" font-size="14" fill="white">♪</text>
          <text x="185" y="35" font-size="16" fill="white">♫</text>
        </g>
      </svg>
    </div>

    <!-- Baby Cat -->
    <div class="absolute bottom-10 left-[-120px] w-32 animate-kittenRun">
      <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
        <!-- Glow -->
        <circle cx="100" cy="80" r="50" fill="hotpink" opacity="0.2" class="animate-glow"/>
        <!-- Tail -->
        <path d="M30 100 q-25 -35 -15 -65" stroke="#ffc9de" stroke-width="10" fill="none" class="animate-tailWagFast"/>
        <!-- Body -->
        <ellipse cx="80" cy="110" rx="45" ry="28" fill="#ffc9de" stroke="#333" stroke-width="3"/>
        <ellipse cx="80" cy="115" rx="43" ry="16" fill="#ffe5f1"/>
        <!-- Legs -->
        <circle cx="60" cy="135" r="8" fill="#ffc9de" stroke="#333" stroke-width="2" class="animate-pawL"/>
        <circle cx="95" cy="135" r="8" fill="#ffc9de" stroke="#333" stroke-width="2" class="animate-pawR"/>
        <!-- Head -->
        <circle cx="120" cy="75" r="30" fill="#ffc9de" stroke="#333" stroke-width="3"/>
        <!-- Ears -->
        <polygon points="105,60 95,35 118,50" fill="#ffc9de" stroke="#333" stroke-width="2"/>
        <polygon points="135,60 145,35 122,50" fill="#ffc9de" stroke="#333" stroke-width="2"/>
        <polygon points="107,55 97,40 115,50" fill="pink"/>
        <polygon points="133,55 143,40 125,50" fill="pink"/>
        <!-- Eyes -->
        <ellipse cx="112" cy="75" rx="5" ry="7" fill="black" class="animate-blinkFast"/>
        <ellipse cx="128" cy="75" rx="5" ry="7" fill="black" class="animate-blinkFast"/>
        <circle cx="111" cy="74" r="2" fill="white"/>
        <circle cx="127" cy="74" r="2" fill="white"/>
        <!-- Nose -->
        <circle cx="120" cy="90" r="3" fill="pink"/>
        <!-- Mouth -->
        <path d="M120 95 q-6 4 -10 0" stroke="#333" stroke-width="2" fill="none"/>
        <path d="M120 95 q6 4 10 0" stroke="#333" stroke-width="2" fill="none"/>
        <!-- Whiskers -->
        <line x1="100" y1="90" x2="80" y2="85" stroke="#333" stroke-width="2"/>
        <line x1="100" y1="95" x2="80" y2="95" stroke="#333" stroke-width="2"/>
        <line x1="140" y1="90" x2="160" y2="85" stroke="#333" stroke-width="2"/>
        <line x1="140" y1="95" x2="160" y2="95" stroke="#333" stroke-width="2"/>
        <!-- Stars -->
        <g class="animate-hearts">
          <circle cx="115" cy="50" r="5" fill="gold"/>
          <circle cx="125" cy="35" r="4" fill="pink"/>
        </g>
      </svg>
    </div>

    <!-- Mouse -->
    <div class="absolute bottom-6 left-[-80px] w-20 animate-mouseRun">
      <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="50" cy="40" rx="30" ry="20" fill="gray" stroke="#333" stroke-width="2"/>
        <!-- Head -->
        <circle cx="80" cy="35" r="15" fill="gray" stroke="#333" stroke-width="2"/>
        <!-- Ears -->
        <circle cx="70" cy="20" r="8" fill="gray" stroke="#333" stroke-width="2"/>
        <circle cx="90" cy="20" r="8" fill="gray" stroke="#333" stroke-width="2"/>
        <circle cx="70" cy="20" r="4" fill="pink"/>
        <circle cx="90" cy="20" r="4" fill="pink"/>
        <!-- Eyes -->
        <circle cx="78" cy="33" r="3" fill="black"/>
        <!-- Nose -->
        <circle cx="95" cy="35" r="3" fill="pink"/>
        <!-- Tail -->
        <path d="M25 40 q-20 10 -25 -10" stroke="pink" stroke-width="4" fill="none" class="animate-tailWhip"/>
        <!-- Cheese stars -->
        <g class="animate-cheese">
          <polygon points="60,10 65,20 55,20" fill="gold"/>
          <polygon points="40,5 45,15 35,15" fill="gold"/>
        </g>
      </svg>
    </div>
  </section>
</header>

<style>
  /* General animations */
  @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .animate-fadeInUp{animation:fadeInUp 1s ease-out forwards}
  @keyframes bounceSlow {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .animate-bounceSlow{animation:bounceSlow 3s infinite}

  /* Cats walk/run */
  @keyframes catWalk {0%{transform:translateX(-200px) scaleX(1)}50%{transform:translateX(50vw) scaleX(1)}100%{transform:translateX(110vw) scaleX(-1)}}
  .animate-catWalk{animation:catWalk 22s linear infinite}
  @keyframes kittenRun {0%{transform:translateX(-100px) translateY(0) scale(1)}25%{transform:translateX(25vw) translateY(-8px)}50%{transform:translateX(55vw) translateY(0)}100%{transform:translateX(120vw) translateY(-6px)}}
  .animate-kittenRun{animation:kittenRun 14s ease-in-out infinite}

  /* Mouse */
  @keyframes mouseRun {0%{transform:translateX(-80px)}50%{transform:translateX(60vw)}100%{transform:translateX(120vw)}}
  .animate-mouseRun{animation:mouseRun 18s linear infinite}
  @keyframes tailWhip {0%,100%{transform:rotate(15deg);transform-origin:25px 40px}50%{transform:rotate(-15deg);transform-origin:25px 40px}}
  .animate-tailWhip{animation:tailWhip 1s infinite}

  /* Tail wag */
  @keyframes tailWag {0%,100%{transform:rotate(15deg);transform-origin:40px 120px}50%{transform:rotate(-20deg)}}
  .animate-tailWag{animation:tailWag 1s ease-in-out infinite}
  @keyframes tailWagFast {0%,100%{transform:rotate(25deg);transform-origin:30px 100px}50%{transform:rotate(-25deg)}}
  .animate-tailWagFast{animation:tailWagFast 0.5s ease-in-out infinite}

  /* Eyes */
  @keyframes blink {0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.1)}}
  .animate-blink{animation:blink 6s infinite;transform-origin:center}
  .animate-blinkFast{animation:blink 3s infinite;transform-origin:center}

  /* Paws */
  @keyframes pawL {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .animate-pawL{animation:pawL 0.8s ease-in-out infinite}
  @keyframes pawR {0%,100%{transform:translateY(-6px)}50%{transform:translateY(0)}}
  .animate-pawR{animation:pawR 0.8s ease-in-out infinite}

  /* Hearts, notes, cheese */
  @keyframes hearts {0%{opacity:0;transform:translateY(0) scale(0.5)}30%{opacity:1;transform:translateY(-20px) scale(1)}100%{opacity:0;transform:translateY(-60px) scale(1.3)}}
  .animate-hearts{animation:hearts 4s ease-in-out infinite}
  @keyframes notes {0%{opacity:0;transform:translateY(0) scale(0.5)}30%{opacity:1;transform:translateY(-15px) scale(1)}100%{opacity:0;transform:translateY(-40px) scale(1.3)}}
  .animate-notes{animation:notes 5s ease-in-out infinite}
  @keyframes cheese {0%{opacity:0;transform:translateY(0)}30%{opacity:1;transform:translateY(-15px)}100%{opacity:0;transform:translateY(-35px)}}
  .animate-cheese{animation:cheese 3s ease-in-out infinite}

  /* Glow */
  @keyframes glow {0%,100%{opacity:.2;r:70}50%{opacity:.4;r:80}}
  .animate-glow{animation:glow 3s ease-in-out infinite}
</style>
