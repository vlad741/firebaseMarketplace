<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            img(src='https://firebasestorage.googleapis.com/v0/b/businessdoska.appspot.com/o/registration.png?alt=media&token=8e3ea916-8e7b-46a5-9a0b-c65efe2d1699')
          .auth__form
            span.ui-title-2 Registration
            form(@submit.prevent="onSubmit")
              .form-item(:class="{ errorInput: $v.email.$error }")
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ error: $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Field is required
                .error(v-if="!$v.email.email") Email is not correct
              .form-item(:class="{ errorInput: $v.password.$error }")
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ error: $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.

              .form-item(:class="{ errorInput: $v.repeatPassword.$error }")
                input(
                  type="password"
                  placeholder="Repeat your password"
                  v-model="repeatPassword"
                  :class="{ error: $v.repeatPassword.$error }"
                  @change="$v.repeatPassword.$touch()"
                )
                .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.

              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :class="{ 'button--disable': $v.$invalid }"
                ) Registration

              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-else) {{ submitStatus }}
                //- p.typo__p(v-if="submitStatus === 'PENDING'") Sending...

              .buttons-list.buttons-list--info
                span Do tou have account?
                  router-link(to="/login")  Enter Here

</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  // Vuelidate
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    // Registration button
    onSubmit () {
      // Initialize Vuelodate
      this.$v.$touch()
      // Invalid
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      // Valid
      } else {
        // User
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            let message = {
              context: 'success',
              title: 'You are register!'
            }
            this.$store.dispatch('getMessage', message)
            // this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// TODO auth stylus
.auth
  display flex
  justify-content space-between
  flex-wrap wrap
.auth__banner,
.auth__form
  width 50%
  @media screen and (max-width: 768px)
    width 100%
    margin-bottom 30px
    &:last-child
      margin-bottom 0

.auth__form
  max-width 400px

.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block

input
  &.error
    border-color #fc5c65
    animation shake .3s

.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0
a
  color #444ce0

// BANNER
.cls-1{fill:none;}.cls-2{isolation:isolate;}.cls-3{fill:#fff3e1;}.cls-4{fill:#4c55e0;}.cls-4,.cls-40{opacity:0.3;}.cls-5{fill:#5e67f1;}.cls-6{fill:#f25f46;}.cls-7{fill:#f7882d;}.cls-8{fill:#d1d9fe;}.cls-35,.cls-9{fill:#868bd3;}.cls-10,.cls-40{fill:#fff;}.cls-11{fill:#e2ebf4;}.cls-12{fill:#e7eafe;}.cls-13{fill:#dd7a7d;}.cls-14{fill:#d2dcf7;}.cls-15{fill:#d6ddea;}.cls-16{fill:#d84835;}.cls-17{fill:#ffaf84;}.cls-18{fill:#293549;}.cls-19{fill:#ed8c62;}.cls-20{fill:#444ce0;}.cls-21{fill:#b6d0ff;}.cls-22{fill:#3972d8;}.cls-23{fill:#f78834;}.cls-24{fill:#687c99;}.cls-25{clip-path:url(#clip-path);}.cls-26{fill:#e0e0e0;mix-blend-mode:multiply;}.cls-27{fill:#cc5605;}.cls-28{fill:#f7f7f7;}.cls-29{fill:#7d87f8;}.cls-30{fill:#c6905b;}.cls-31{fill:#e24530;}.cls-32{fill:#444ce0;}.cls-33{fill:#efa21b;}.cls-34{clip-path:url(#clip-path-2);}.cls-35{opacity:0.7;}.cls-36{fill:#e2e2e2;}.cls-37{fill:#f78879;}.cls-38{fill:#efa46c;}.cls-39{fill:#bfe2ef;opacity:0.4;}
</style>
