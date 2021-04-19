## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) for more details.

### Path Aliasing

`~/` is aliased to `./src/` folder.

For example, instead of having

```ts
import { isDark } from '../../../../logic'
```

now, you can use

```ts
import { isDark } from '~/logic'
```

---
title: About
---

<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>About</h3>
</div>

[Vitesse](https://github.com/antfu/vitesse) is an opinionated [Vite](https://github.com/vitejs/vite) starter template made by [@antfu](https://github.com/antfu) for mocking apps swiftly. With **file-based routing**, **components auto importing**, **markdown support**, I18n, PWA and uses **Tailwind** v2 for UI.

```js
// syntax highlighting example
function vitesse() {
  const foo = 'bar'
  console.log(foo)
}
```

Check out the [GitHub repo](https://github.com/antfu/vitesse) for more details.

