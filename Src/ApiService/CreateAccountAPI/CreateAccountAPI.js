import {A_API} from "../A_API/A_API.js"

export class CreateAccountAPI extends A_API {
    constructor() {
        super();
    }

    set_url() {
        return "http://localhost:9000/auth/register";
    }

    set_method() {
        return "POST";
    }

    set_header() {
        return {
            'Content-Type': 'application/json'
        };
    }

    set_body(username, email, password, confirmpassword) {
        console.log("username :", username);
        console.log("email :", email);
        console.log("password :", password);
        console.log("confirmpassword :", confirmpassword);
        this.body = JSON.stringify({
            username: username,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        });
    }

    pre_fetch() {
        if (!this.body) {
            throw new Error("Body must be set before calling pre_fetch");
        }
        console.log(this.body)
        const body = JSON.parse(this.body);
        if(!body.username || body.username === ""){
            console.error("empthy username data")
            throw new Error("Validation failed: Empty username");
        }
        if(!body.email || body.email === ""){
            console.error("empthy email data")
            throw new Error("Validation failed: Empty email");
        }
        if(!body.password || body.password === ""){
            console.error("empthy password data")
            throw new Error("Validation failed: Empty password");
        }
        if(!body.confirmpassword || body.confirmpassword === ""){
            console.error("empthy confirmpassword data")
            throw new Error("Validation failed: Empty confirmpassword");
        }
    }

    after_fetch(responseData) {
        if (responseData.message !== 'Successful') {
            return {
                success: false,
                message: "The email or username already exists in the database."
            };
        } else {
            return {
                success: true,
                message: "Account created successfully.",
                data: responseData
            };
        }
    }
}