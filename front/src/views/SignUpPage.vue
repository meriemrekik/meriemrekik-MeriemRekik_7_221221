<template>
  <Menu :liens="liensMenu" />
  <SignUp />
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import SignUp from "@/components/sign/SignUp.vue";

export default {
  name: "SignUpPage",
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
    SignUp,
  },
};
</script>


