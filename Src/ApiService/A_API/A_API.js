export class A_API {
    constructor() {
      if (new.target === A_API) {
        throw new TypeError("Cannot construct Abstract instances directly");
      }
      this.url = this.set_url();
      this.method = this.set_method();
      this.headers = this.set_header();
      this.body = this.set_body();
    }

    async fetch_data() {
      try {
        const response = await fetch(this.url, {
          method: this.method,
          headers: this.headers,
          body: this.body,
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
      this.after_fetch();
    }

    call

    set_url() {
      throw new Error("set_url() must be implemented in subclass");
    }

    set_method() {
      throw new Error("set_body() must be implemented in subclass");
    }
    
    set_header() {
      throw new Error("set_header() must be implemented in subclass");
    }
  
    set_body() {
      throw new Error("set_body() must be implemented in subclass");
    }

    after_fetch() {
      throw new Error("after_fetch() must be implemented in subclass");
    }
}