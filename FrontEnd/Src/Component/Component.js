export class Component extends HTMLElement {

    #elementName;
    #component;
    #componentStyle;
    #componentEventListeners;
    #is_create;
  
    constructor(name, componentStyle = "") {
      super();
      this.#elementName = name;
      this.#componentStyle = componentStyle;
      this.attachShadow({ mode: "open" });
      this.#componentEventListeners = [];
      this.#is_create = false;
    }
  
    connectedCallback() {
      if (!this.#is_create) {
        this.#component = document.createElement(this.#elementName);

        const bootstrap = document.createElement('link');
        bootstrap.setAttribute('rel', 'stylesheet');
        bootstrap.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        this.shadowRoot.appendChild(bootstrap);

        const style = document.createElement('style');
        style.textContent = this.#componentStyle;
        this.shadowRoot.appendChild(style);

        if (!this.#component) {
          return;
        }
        this.#is_create = true;
        this.postCreate();
      }
    }
  
    addComponentEventListener(element, event, callback, callbackInstance=this) {
      if (!element) {
        return;
      }
      if (!this.#componentEventListeners[event]) {
        this.#componentEventListeners[event] = [];
      }
      const eventCallback = callback.bind(callbackInstance);
      this.#componentEventListeners[event].push({element, eventCallback});
      element.addEventListener(event, eventCallback);
    }
  
    removeComponentEventListener(element, event) {
      const eventListeners = this.#componentEventListeners[event];
  
      if (eventListeners) {
        for (const eventListener of eventListeners) {
          if (eventListener.element === element) {
            element.removeEventListener(event, eventListener.eventCallback);
            eventListeners.splice(eventListeners.indexOf(eventListener), 1);
          }
        }
      }
    }
  
    removeAllComponentEventListeners() {
      for (const event in this.#componentEventListeners) {
        if (this.#componentEventListeners.hasOwnProperty(event)) {
          const eventListeners = this.#componentEventListeners[event];
          for (const eventListener of eventListeners) {
            eventListener.element.removeEventListener(event,
                eventListener.eventCallback);
          }
        }
      }
      this.#componentEventListeners = [];
    }
  
    postCreate() {
    }

    render() {
      const appElement = document.querySelector("#App");
      if (appElement) {
        appElement.innerHTML = "";
        appElement.appendChild(this);
      }
    }

    getElementName() {
      return this.#elementName;
    }
  }