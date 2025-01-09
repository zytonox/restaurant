<template>
  <div class="auth">
    <a
      class="auth__toggle"
      href="#"
      @click="
        removeErrors();
        resetInputs();
        isLoginForm = !isLoginForm;
      "
    >
      {{ isLoginForm ? "Зарегистрироваться" : "Авторизироваться" }}
    </a>

    <h2 class="title">{{ isLoginForm ? "ВХОД" : "РЕГИСТРАЦИЯ" }}</h2>

    <form class="auth__form">
      <input
        id="login"
        v-model="loginInput"
        class="auth__form-input"
        placeholder="Логин"
        type="text"
      />

      <p class="auth__form-error" ref="errorLoginElement" >
        Поле не должно быть пустым
      </p>

      <input
        id="password"
        v-model="passwordInput"
        autocomplete="on"
        class="auth__form-input"
        placeholder="Пароль"
        type="password"
      />

      <p class="auth__form-error" ref="errorPasswordElement">
        Поле не должно быть пустым
      </p>

      <label class="auth__form-label">
        <input
          id="checkbox"
          v-model="checkboxInput"
          class="auth__form-checkbox"
          type="checkbox"
        />

        <div class="auth__form-checkmark"></div>

        <span class="auth__form-consent"
          >Я согласен получать обновления на почту</span
        >
      </label>

      <p class="auth__form-error" ref="errorCommonElement">
        Логин или пароль неверен
      </p>

      <button
        class="auth__form-submit"
        type="submit"
        @click.prevent="submitForm"
      >
        {{ isLoginForm ? "Войти" : "Зарегистрироваться" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'FormAuth',
  setup () {
    const router = useRouter()

    const isLoginForm = ref(true)

    const toggle = ref()
    const title = ref()
    const submit = ref()

    const loginInput = ref('')
    const passwordInput = ref('')
    const checkboxInput = ref(false)

    const errorLoginElement = ref()
    const errorPasswordElement = ref()
    const errorCommonElement = ref()

    const validateEmptyInput = (input, errorElement) => {
      if (input.value.trim() === '') {
        errorElement.value.innerText = 'Поле не должно быть пустым'
        errorElement.value.style.visibility = 'visible'
        return false
      } else {
        return true
      }
    }

    const validateInputMinLength = (input, errorElement) => {
      if (input.value.trim().length < 4) {
        const isLoginInput =
          errorElement.value.nextSibling.classList.value === 'auth__form-input'
        const currentInput = isLoginInput ? 'Логин' : 'Пароль'

        errorElement.value.innerText = `${currentInput} должен содержать не менее 4-х символов`
        errorElement.value.style.visibility = 'visible'
        return false
      } else {
        return true
      }
    }

    const removeErrors = () => {
      errorLoginElement.value.style.visibility = 'hidden'
      errorPasswordElement.value.style.visibility = 'hidden'
      errorCommonElement.value.style.visibility = 'hidden'
    }

    const validateInputs = () => {
      removeErrors()

      const isNewLoginValid = validateEmptyInput(loginInput, errorLoginElement)
        ? validateInputMinLength(loginInput, errorLoginElement)
        : false

      const isNewPasswordValid = validateEmptyInput(
        passwordInput,
        errorPasswordElement
      )
        ? validateInputMinLength(passwordInput, errorPasswordElement)
        : false

      if (isNewLoginValid && isNewPasswordValid) {
        return true
      }
    }

    const resetInputs = () => {
      loginInput.value = ''
      passwordInput.value = ''
      checkboxInput.value = false
    }

    const submitForm = () => {
      const isEachInputValid = validateInputs()
      if (isEachInputValid) {
        if (!isLoginForm.value) {
          localStorage.setItem(
            'userData',
            JSON.stringify({
              login: loginInput.value.trim(),
              password: passwordInput.value.trim()
            })
          )

          router.go(0)
        } else {
          const userData = JSON.parse(localStorage.getItem('userData'))

          if (!userData) {
            errorCommonElement.value.style.visibility = 'visible'
            resetInputs()
            return
          }

          const userLogin = userData.login
          const userPassword = userData.password

          const isLoginValid = loginInput.value === userLogin
          const isPasswordValid = passwordInput.value === userPassword

          if (isLoginValid && isPasswordValid) {
            localStorage.setItem('isUserLoggedIn', 'true')
            router.push('/')
          } else {
            errorCommonElement.value.style.visibility = 'visible'
          }
        }

        localStorage.setItem(
          'hasSubscriptionConsent',
          `${checkboxInput.value}`
        )

        resetInputs()
      }
    }

    return {
      isLoginForm,
      toggle,
      title,
      submit,
      loginInput,
      passwordInput,
      checkboxInput,
      errorLoginElement,
      errorPasswordElement,
      errorCommonElement,
      validateInputs,
      removeErrors,
      resetInputs,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

* {
  color: $color-tertiary;
}

.auth {
  @include flex-centre;
  flex-direction: column;
  width: 460px;
  margin: 25vh auto auto;
  padding: 7px 20px 34px;
  background-color: $color-secondary;

  &__toggle {
    align-self: flex-end;
    margin-bottom: 8px;
    @include font-light;
    line-height: 14px;
    color: $color-primary;
  }

  &__form {
    @include flex-centre;
    flex-direction: column;

    &-input {
      width: 420px;
      height: 39px;
      padding-left: 17px;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid $color-primary;
      border-radius: 61px;
      background-color: $color-secondary;

      &::placeholder {
        color: $color-tertiary;
      }

      &:nth-child(1) {
        margin-top: 28px;
      }
    }

    &-error {
      visibility: hidden;
      align-self: flex-start;
      margin: 2px 0 3px 18px;
      font-size: 8px;
      line-height: 10px;
      color: #ff0b0b;

      &:nth-child(4) {
        margin-bottom: 2px;
      }

      &:nth-child(6) {
        align-self: center;
        margin: 8px 0 11px;
      }
    }

    &-label {
      align-self: flex-start;
    }

    &-checkbox {
      position: absolute;
      opacity: 0;
    }

    &-checkbox:checked + &-checkmark::after {
      opacity: 1;
    }

    &-checkmark {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 9px;
      vertical-align: middle;
      border: 1px solid $color-primary;
      border-radius: 30px;
      cursor: pointer;

      &::after {
        position: absolute;
        inset: 1px auto auto 5px;
        width: 4px;
        height: 10px;
        transform: rotate(45deg);
        opacity: 0;
        border: solid $color-primary;
        border-width: 0 2px 2px 0;
        content: '';
      }
    }

    &-consent {
      @include font-light;
      color: #301411;
    }

    &-submit {
      width: 200px;
      height: 42px;
      @include font-normal;
      border: none;
      background-color: $color-primary;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
