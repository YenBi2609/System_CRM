 <template>
   <v-app>
    <v-snackbar
        top
        light
        v-model="notify"
        color="#f58634"
        :timeout="2000"
    >
        {{ message }}
    </v-snackbar>
    <v-flex xs12 sm8 md4 h-100 w-100 style="margin-left: 35%">
        <v-card 
            class="elevation-6" 
            style="top: 50%; left: 50%; transform: translate(-50%,-50%);">
            <v-toolbar flat>
                <v-toolbar-title class="w-100 text-center mt-6">
                    <img height="40px" :src="require('./../assets/image/symper-full-logo.png')" />
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        :rules="emailRules"
                        v-model="email"
                        color="orange darken"
                        label="Tài khoản"
                        @keyup.enter="checkAndLogin"
                        name="login"
                        type="text"
                        ref="account"
                    >
                        <v-icon slot="prepend">mdi-account-outline</v-icon>
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        color="orange darken"
                        id="password"
                        label="Mật khẩu"
                        name="password"
                        @keyup.enter="checkAndLogin"
                        prepend-icon="lock"
                        type="password"
                        ref="password"
                    >
                        <v-icon slot="prepend">mdi-lock-outline</v-icon>
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :loading="checkingUser"
                    @click="login()"
                    text
                    class="symper-bg-orange w-100"
                    dark
                >Đăng nhập</v-btn>
            </v-card-actions>
            <div class="d-flex justify-center bg-secondary mb-3">
                <v-btn text class="fs-13 fw-400 mb-2" style="color:blue" @click="forgotPass">Quên mật khẩu</v-btn>
            </div>
        </v-card>
    </v-flex>
    </v-app>
</template>

<script>
import { userApi } from '@/api/user';

export default {
    mounted(){
        // let self = this;
        // self.$refs.account.$emit('keydown')
        // setTimeout(() => {
        //     self.$refs.account.$emit('input')
        // }, 1000);
    },
    created(){
        // if(util.auth.checkLogin()){
            // this.$router.push("/");
        // }
    },
    methods: {
        forgotPass(){
              this.$router.push("login/forgot-pass");
        },
        checkAndLogin(){
            let canLogin = true;
            if(!this.email.trim()){
                canLogin = false;
            }

            if(!this.password.trim()){
                canLogin = false;
            }

            if(canLogin){
                this.login();
            }
        },
        login() {
            this.$refs.form.validate();
            let thisCpn = this;
            if (this.valid) {
                thisCpn.checkingUser = true;
                userApi
                    .login({email: this.email.trim(), password: this.password.trim()})
                    .then(async (res) => {
                        if (res.data.user.length != 0) {
                            // this.$store.commit('app/setAccountType', res.data.profile.type)
                            // await this.$store.dispatch('app/setUserInfo', res.data);
                            // if(this.$route.query.redirect){
                            //     window.location.href = this.$route.query.redirect;
                            // }else{
                            //     this.$router.push('/');
                            // }
                            this.$store.commit('updateCurentUser', res.data.user[0]);
                            this.$router.push("/dashboard");
                        } else {
                            this.notify = true
                            this.message = "Không thể đăng nhập. Tài khoản hoặc mật khẩu không chính xác!"
                        }
                    })
                    .catch(err => {
                        console.log("error from login api!!!", err);
                    })
                    .finally(() => {
                        setTimeout(() => {
                            thisCpn.checkingUser = false;
                        }, 1000);
                    });
            } else {
                console.log("Login info is not valide!!!!");
            }
        }
    },
    data() {
        return {
            checkingUser: false,
            valid: true,
            email: "",
            password: "",
            emailRules: [
                v => !!v || "Email không được để trống",
                v => /.+@.+\..+/.test(v) || "Email không hợp lệ"
            ],
            passwordRules: [v => !!v || "Mật khẩu không được để trống"],
            notify: false,
            message: ''
        };
    }
};
</script>

<style>
.flex.md4{
    flex-basis: auto !important;
}
</style>