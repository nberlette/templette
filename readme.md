<div align=center>
<h1><code>templette</code></h1>
<h4>petite template compilation class</h4>
</div>
<br>

## Getting Started

<br>

### 1. Install

```bash
pnpm add -D templette
```

```bash
yarn add --dev templette
```

```bash
npx i -D templette
```

### 2. Import

```js
// es modules
import Templette from 'templette';
```

```js
// commonjs
const Templette = require('templette');
```

### 3. Instantiate

```js
const t = new Templette();
// or
const t = new Templette('Hello {{name}}!');
```

### 4. Compile

```js
// when you've defined the template in the constructor
t.render({name: 'nberlette'});
```

```js
// to define the template on the fly
t.compile('Hello {{name}}!', {name: 'nberlette'});
```

### Or, use the static compile method

```js
Templette.compile('Hello {{name}}!', {name: 'nberlette'});
```

---

## API

<br>

<a name="static-compile"></a>

<h3><code>static <strong>compile</strong>(<strong>template</strong>: <em><u>Template</u></em>, <strong>values</strong>: <em><u>Values</u></em>): string</code></h3><br>

**Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.**

**Type**: `global function`

**Params**

- template <code>Template</code> - the raw template string we want to compile
- values <code>Values</code> - substitutions to make, either as a generic list (for numbered keys), or as a map-style
  object to replace named keys or deep (dot-notation) paths.

**Returns**: <code>string</code>

<br>

#### Example

```js
Templette.compile('Hello {{name}}!', {name: 'Nick'});
// Hello Nick!
```

<br><hr><br>

<a name="cleanup"></a>

<h3><code>static <strong>cleanup</strong>(<strong>template</strong>: <em><u>Template</u></em>, <strong>substitutions</strong>: <em>[<u>string</u> | <u>number</u> | <u>RegExp</u>,  <u>any</u>]</em>): string</code></h3><br>

**Cleanup a template string and remove some inconsistencies.**

**Kind**: global function **Returns**: <code>string</code> - formatted and normalized template string **Params**

- template <code>string</code> - raw unformatted template string
- [substitutions] <code>Record.&lt;string, unknown&gt;</code> - optional map of substitutions to make: each property
  name is the search pattern or string, and its value is the replacement string or function.

<br><hr><br>

<a name="compile"></a>

### `compile(template, values)`  ⇒  <code>string</code>

Templette's main compile method, powered by JavaScript's powerful builtin RegExp engine.

**Type**: `global function`

**Params**:

- template <code>Template</code> - the raw template string we want to compile
- values <code>Values</code> - substitutions to make, either as a generic list (for numbered keys), or as a map-style
  object to replace named keys or deep (dot-notation) paths.

#### **Example**:

```js
Templette.compile('Hello {{name}}!', {name: 'Nick'});
// Hello Nick!
```

<br><hr><br>

<a name="render"></a>

### `render(values)`  ⇒  <code>string</code>

Render the template with provided values.

**Type**: `global function`

**Params**:

- values <code>Values</code> - substitutions to make, either as a generic list (for numbered keys), or as a map-style
  object to replace named keys or deep (dot-notation) paths.

<br><hr><br>

<div align=center>

MIT © [Nicholas Berlette](https://github.com/nberlette) · inspired by
[@lukeed/templite](https://github.com/lukeed/templite)

</div>
