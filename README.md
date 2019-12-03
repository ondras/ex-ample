# &lt;ex-ample&gt;

## Install
```bash
npm i @ondras/ex-ample --registry https://npm.pkg.github.com
```

## Include
```html
<link rel="stylesheet" href="node_modules/@ondras/ex-ample/ex-ample.css" />
<script src="node_modules/@ondras/ex-ample/ex-ample.js"></script>
```

## Syntax highlighting
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/github.min.css" />
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js"></script>
```

## Use
```html
<!-- HTML editor -->
<ex-ample>
	<a href="#">some <em>link</em></a>
</ex-ample>

<!-- JS editor -->
<ex-ample language="js">
	let node = document.createElement("marquee");
	node.textContent = "Hello";
	appendChild(node);
</ex-ample>
```

## Demo page
https://ondras.github.io/ex-ample/

## Awesome!
Built with love (and caribbean rum) by [Ondřej Žára](https://ondras.zarovi.cz/)
