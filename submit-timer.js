class SubmitTimer extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._barWidth = 0

    // this._shadowRoot.appendChild(this._container)
    this._shadowRoot.innerHTML = `
      <div id="container" style="display: flex; flex-direction: column;">
        <span id="progress-text" style="margin-left: 5%">Please wait to submit...</span>  
        <div id="progress-bar" style="width:90%; height:20px; margin: 5px auto; border: 3px solid black;">
          <div id="progress" style="width:${this._barWidth}%; height:100%; background-color: green;"></div>
        </div>
        <button id="submit" 
          style="
            align-self: flex-end;
            margin-right: 5%;
            opacity: 0.5;
            background-color: red;
            pointer-events: none;
          ">Submit?</button>
      </div>
    `
  }

  connectedCallback() {
    this._timer = setInterval(() => {
      this._barWidth += 1
      this._shadowRoot.querySelector('#progress').style.width = `${this._barWidth}%`
      if (this._barWidth === 100) {
        clearInterval(this._timer)
        this._shadowRoot.querySelector('#progress-text').innerText = 'Ready to submit!'
        const button = this._shadowRoot.querySelector('#submit')
        button.style.opacity = 1
        button.style.backgroundColor = 'green'
        button.style.pointerEvents = 'auto'
      }
    }, 200)
  }

  disconnectedCallback() {
    clearInterval(this._timer)
  }
}

customElements.define('submit-timer', SubmitTimer);