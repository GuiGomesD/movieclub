<template>
  <div class="Background">
    <div class="FormCard">
      <div class="FormContent">
        <h2 id="login-text">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="inputs">
            <div class="username-input">
              <label for="username" id="user-label">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                v-model="username"
                :class="{ 'input-error': errorUsername }"
                 @input="errorUsername = ''"
              />
              <span v-if="errorUsername" class="error-message">{{ errorUsername }}</span>
            </div>

            <div class="password-input">
              <label for="password" id="pw-label">Password</label>
              <input
                :type="showPassword ? 'text' : 'password'"
                name="password"
                id="password"
                placeholder="Password"
                v-model="password"
                @focus="onPasswordFocus"
                @blur="onPasswordBlur"
                @input="errorPassword = ''"
                :class="{ 'input-error': errorPassword }"
              />
              <span 
                v-if="showEyeIcon" 
                class="eye-icon" 
                @click="togglePasswordVisibility($event)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="feather feather-eye">
                  <path d="M1 12s3-7 11-7 11 7 11 7-3 7-11 7-11-7-11-7z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </span>
            </div>
            <span v-if="errorPassword" class="error-message">{{ errorPassword }}</span>
            <span id="forgot"><a href="#">Forgot your password?</a></span>
          </div>

          <div class="remember">
            <input type="checkbox" name="remember-check" id="remember-check"  v-model="rememberMe"/>
            <label for="remember-check">Remember me</label>
          </div>

          <div class="login-button">
            <button type="submit">Login</button>
          </div>
          <span id="guest"><a href="#">Login as a guest</a></span>
          <span>Don't you have an account?</span> <a href="#" id="register">Register now</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      showEyeIcon: false,
      errorUsername: '',
      errorPassword: ''
    };
  },
  methods: {
    handleLogin() {
      this.errorUsername = '';
      this.errorPassword = '';

      if (!this.username.trim()) {
        this.errorUsername = 'Please enter a valid username.';
      }

      if (!this.password.trim()) {
        this.errorPassword = 'Please enter your password.';
      }

      if (this.errorUsername || this.errorPassword) {
        return;
      }

      const loginData = {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      };

      console.log('Dados de login:', loginData);
    },

    togglePasswordVisibility(event) {
      event.preventDefault();
      this.showPassword = !this.showPassword;
    },

    onPasswordFocus() {
      this.showEyeIcon = true;
    },

    onPasswordBlur(event) {
      if (event.relatedTarget && event.relatedTarget !== this.$refs.eyeIcon) {
        this.showEyeIcon = false;
      }
    }
  }
};
</script>

<style scoped>
.Background {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
}

.FormCard {
  display: flex;
  flex-direction: column;
  background-color: rgba(19, 19, 19, 0.904);
  padding: 60px;
  width: 450px;
  color: white;
  border-radius: 5px;
  height: 600px;
  z-index: 1;
}

.FormContent {
  margin-top: 5px;
}

#login-text {
  margin: 30px 0px 20px;
  font-size: 25px;
  font-weight: 500;
  color: #F1F1F1;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#username, #password {
  padding: 15px 12px;
  background-color: rgba(0, 0, 0, 0.103);
  border: 1px solid rgb(87, 87, 87);
  border-radius: 3px;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
}

#username::placeholder, #password::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  transition: all 0.3s ease;
  transform: translateY(0);
}

#username:focus::placeholder, #password:focus::placeholder {
  transform: translateY(-20px);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

#username:not(:placeholder-shown)::placeholder,
#password:not(:placeholder-shown)::placeholder {
  transform: translateY(-20px);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}


.password-input {
  position: relative;
}

.eye-icon {
  position: absolute;
  top: 65%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.eye-icon:hover {
  opacity: 50%;
}

.login-button button {
  background-color: #01eaa8;
  color: black;
  font-weight: bold;
  width: 100%;
  margin: 15px 0px;
  padding: 12px 0px;
  border-radius: 3px;
  transition: 0.2s;
}

.login-button button:hover {
  opacity: 50%;
}

#forgot {
  display: flex;
  margin-bottom: 10px;
  justify-content: start;
}

#guest {
  display: flex;
  margin-bottom: 12px;
  justify-content: center;
  text-align: center;
}

.remember {
  display: flex;
  align-items: center;
  gap: 7px;
}

#remember-check {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid white;
  background-color: transparent;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

#remeber-check  span b {
  background-color: red;
}

#remember-check:hover {
  border-color: rgb(110, 110, 110);
}

#remember-check:checked {
  background-color: #01eaa8;
  border-color: #01eaa8;
}

#remember-check:checked::after {
  content: '\2713';
  position: absolute;
  top: -2.5px;
  left: 3px;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  font-size: 14px;
}

.error-message {
  color: #EB3942;
  font-size: 14px;
  margin-top: -8px;
}

.input-error {
  border: 1px solid #EB3942 !important;
}

span {
  color: rgb(185, 185, 185);
}

#register {
  font-weight: 500;
  color: #F1F1F1;
}

a:hover {
  text-decoration: underline;
}


@media(max-width: 600px) {
  .Background {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: start;
  }

  .FormCard {
    width: 100%;
    height: 550px;
    padding: 25px;
    border-radius: 0px;
    background-color: rgb(15, 15, 15);
  }
}
</style>
