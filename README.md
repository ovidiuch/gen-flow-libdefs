# gen-flow-libdefs

Automatically generate Flow libdefs from source code

## Why?

Flow types are not supported by all library consumers, so we strip them when we compile a library and publish it on npm. But some consumers _are_ interested in Flow types. So we publish additional [libdefs](https://flow.org/en/docs/libdefs/), either via `flow-typed` or `.js.flow` files (I prefer the latter). But composing these library definitions entails **duplication**: Handpicking the already-defined types of the exported APIs to derive a Flow interface. _Can this be automated?_

Context:

- https://github.com/facebook/flow/issues/714
- https://github.com/facebook/flow/issues/5871
- https://twitter.com/brian_d_vaughn/status/1028303371306844166
