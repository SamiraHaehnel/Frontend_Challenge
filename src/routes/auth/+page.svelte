<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { login, signup } from "$lib/auth/AuthService";

  type Mode = "login" | "signup";
  let mode = $state<Mode>("login");

  let nickname = $state("");
  let email = $state("");
  let password = $state("");
  let passwordConfirm = $state("");
  let errorMessage = $state("");
  let infoMessage = $state("");
  let loading = $state(false);

  // Mögliche Nachrichten für den User
  function resetMessages() {
    errorMessage = "";
    infoMessage = "";
  }

  function validateEmail(value: string) {
    return /.+@.+\..+/.test(value);
  }

  function validateForm(): string | null {
    if (!validateEmail(email)) return "Bitte gib eine gültige E-Mail ein.";
    if (password.length < 6)
      return "Das Passwort muss mindestens 6 Zeichen haben.";
    if (mode === "signup") {
      if (nickname.length < 3)
        return "Der Nickname muss mindestens 3 Zeichen haben.";
      if (nickname.length > 20)
        return "Da hast du dich schon durchgemogelt und darst dennoch kein längeren Nickname haben.";
      if (password !== passwordConfirm)
        return "Passwörter stimmen nicht überein.";
    }
    return null;
  }

  function mapAuthError(error: any): string {
    // Error Handling, um auch in einer Sprache zu bleiben
    const code = error?.code ?? "";
    const msg = error?.message?.toLowerCase?.() ?? "";
    switch (code) {
      case "invalid_credentials":
        return "E-Mail oder Passwort ist falsch.";
      case "email_not_confirmed":
        return "Bitte bestätige zuerst deine E-Mail.";
      case "user_already_exists":
        return "Es existiert bereits ein Account mit dieser E-Mail.";
      case "over_request_limit":
        return "Zu viele Versuche. Bitte später erneut versuchen.";
      default:
        if (msg.includes("invalid login credentials"))
          return "E-Mail oder Passwort ist falsch.";
        return "Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.";
    }
  }

  async function handleAuth() {
    resetMessages();
    const validationError = validateForm();
    if (validationError) {
      errorMessage = validationError;
      return;
    }

    loading = true;
    try {
      const { data, error } =
        mode === "login"
          ? await login(email, password)
          : await signup(email, password, nickname);

      if (error) throw error;

      if (data?.user && !data?.session) {
        infoMessage =
          "Registrierung erfolgreich. Bitte bestätige deine E-Mail!";
        mode = "login";
        password = "";
        passwordConfirm = "";
        nickname = "";
        return;
      }

      await invalidateAll();
      await goto("/");
    } catch (err) {
      errorMessage = mapAuthError(err);
    } finally {
      loading = false;
    }
  }
</script>

<section
  class="max-w-md mx-auto my-10 p-6 rounded-xl backdrop-blur border border-purple bg-nav"
>
  <div class="flex items-center justify-center mb-6">
    <img src="/logo.png" alt="Logo" class="h-16 w-16" />
  </div>

  <div
    class="grid gap-1 mb-6 rounded-lg bg-purple-dark p-1"
    role="tablist"
    aria-label="Auth"
  >
    <button
      type="button"
      role="tab"
      id="tab-login"
      class="py-2 rounded-md text-sm font-medium text-center cursor-pointer transition-colors"
      class:bg-yellow-bright={mode === "login"}
      class:text-purple-dark={mode === "login"}
      class:text-white={mode !== "login"}
      onclick={() => (mode = "login")}
    >
      Anmelden
    </button>
  </div>

  {#if infoMessage}
    <p class="mb-4 text-sm text-green-500">{infoMessage}</p>
  {/if}
  {#if errorMessage}
    <p class="mb-4 text-sm text-red-500">{errorMessage}</p>
  {/if}

  <form
    onsubmit={(event) => {
      event.preventDefault();
      handleAuth(event);
    }}
    class="space-y-4"
  >
    <div>
      <label for="email" class="block text-sm text-white mb-1">E-Mail</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        required
        class="w-full rounded-md bg-purple-dark text-white border border-purple p-2 focus:outline-none focus:ring-2 focus:ring-yellow-bright"
      />
    </div>

    <div>
      <label for="password" class="block text-sm text-white mb-1"
        >Passwort</label
      >
      <input
        id="password"
        type="password"
        bind:value={password}
        required
        class="w-full rounded-md bg-purple-dark text-white border border-purple p-2 focus:outline-none focus:ring-2 focus:ring-yellow-bright"
      />
    </div>

    {#if mode === "signup"}
      <div>
        <label for="nickname" class="block text-sm text-white mb-1"
          >Username</label
        >
        <input
          id="nickname"
          type="text"
          maxlength="20"
          bind:value={nickname}
          required
          class="w-full rounded-md bg-purple-dark text-white border border-purple p-2 focus:outline-none focus:ring-2 focus:ring-yellow-bright"
        />
      </div>

      <div>
        <label for="passwordConfirm" class="block text-sm text-white mb-1">
          Passwort bestätigen
        </label>
        <input
          id="passwordConfirm"
          type="password"
          bind:value={passwordConfirm}
          required
          class="w-full rounded-md bg-purple-dark text-white border border-purple p-2 focus:outline-none focus:ring-2 focus:ring-yellow-bright"
        />
      </div>
    {/if}

    <button
      type="submit"
      class="w-full bg-yellow-bright text-purple-dark font-semibold rounded-md py-2 disabled:opacity-60"
      disabled={loading}
    >
      {#if loading}
        Wird gesendet, bitte warte, ganz schön viel los…
      {:else if mode === "signup"}
        Registrieren
      {:else}
        Anmelden
      {/if}
    </button>
  </form>
</section>
