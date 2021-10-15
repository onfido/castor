# Migration guides

## 1.x to 2.x

### Input and Textarea (React)

- `children` is no longer supported in either component, instead compose with `FieldLabel`

```tsx
// before
<Input>My input label</Input>

// after
<FieldLabel>
  My input label
  <Input />
</FieldLabel>
```

### Icon (React)

- for improved accessibility, it now requires either `aria-hidden="true"` or `aria-label`
  - use `aria-hidden="true"` when the icon has no semantic meaning and should be hidden from screen readers
  - otherwise use `aria-label` to describe its semantic meaning to screen readers

```tsx
// before
<Icon name="cog" />

// after
<Icon name="cog" aria-hidden="true" />
// or
<Icon name="cog" aria-label="Settings" />
```

### Select native (CSS)

- `.-empty` modifier class on `.ods-select-native` should now be on `.ods-select` instead

```tsx
// before
<div class="ods-select">
  <div class="ods-select-native -empty"></div>
</div>

// after
<div class="ods-select -empty">
  <div class="ods-select-native"></div>
</div>
```

- (NON-BREAKING) `.ods-select-native` no longer needs `.-borderless` class, only its parent `.ods-select` does

```tsx
// before
<div class="ods-select -borderless">
  <div class="ods-select-native -borderless"></div>
</div>

// after
<div class="ods-select -borderless">
  <div class="ods-select-native"></div>
</div>
```
