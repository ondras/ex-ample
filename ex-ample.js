function getCaretPosition(parent) {
	if (!parent.firstChild) { return 0; }
	let range = getSelection().getRangeAt(0);
	range.setStart(parent.firstChild, 0);
	return range.toString().length;
}

function setCaretPosition(parent, position) {
	let refNode, offset;

	let text;
	let walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
	while (text = walker.nextNode()) {
		let len = text.length;
		if (len >= position) { // this node
			refNode = text;
			offset = position;
			break;
		} else {
			position -= len;
		}
	}

	if (refNode) {
		let r = document.createRange();
		r.setStart(refNode, offset);
		r.setEnd(refNode, offset);
		let s = getSelection();
		s.removeAllRanges();
		s.addRange(r);
	}
}

function createAppendSource(id) {
	return `function appendChild(n) {
		let s = document.getElementById("${id}");
		s && s.parentNode && s.parentNode.appendChild(n);
	}`;
}

class ExAmple extends HTMLElement {
	connectedCallback() {
		this._build();
	}

	_build() {
		let code;

		this.style.whiteSpace = "pre"; // so we can read innerText pre-formatted
		switch (this.getAttribute("language")) {
			case "js": code = this.innerText; break;
			default: code = this.innerHTML; break;
		}
		this.style.whiteSpace = "";

		this._code = document.createElement("code");
		this._code.contentEditable = true;

		this._output = document.createElement("output");

		this.innerHTML = "";
		this.appendChild(this._code);
		this.appendChild(this._output);

		this._code.textContent = code;
		this._update();

		this._code.addEventListener("input", e => this._update());
	}

	_update() {
		let code = this._code.innerText.trimStart();
		let language = this.getAttribute("language") || "html";

		switch (language) {
			case "js":
				this._output.innerHTML = "";
				let script = document.createElement("script");
				script.id = `s${Math.random()}`;
				script.type = "module";
				script.textContent = `${code};${createAppendSource(script.id)}`;
				this._output.appendChild(script);
			break;

			default:
				this._output.innerHTML = code;
			break;
		}

		if (window.hljs) {
			let result = hljs.highlight(language, code, true);
			this._code.classList.add("hljs");

			let caret = getCaretPosition(this._code);
			this._code.innerHTML = result.value;
			setCaretPosition(this._code, caret);
		}
	}
}

customElements.define("ex-ample", ExAmple);
