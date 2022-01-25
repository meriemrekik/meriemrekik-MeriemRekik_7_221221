<template>
  <Menu :liens="liensMenu" />
  <div class="container-md">
    <SignIn />
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import SignIn from "@/components/sign/SignIn.vue";

export default {
  name: "SignInPage",
  data() {
    return {
      liensMenu: [
        { url: "signUp", text: "Sign Up" },
        { url: "signIn", text: "Sign In" },
      ],
    };
  },
  components: {
    Menu,
    SignIn,
  },
};
</script>


