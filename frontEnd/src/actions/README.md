```
Middleware action 被发起之后，到达 reducer 之前的扩展点
ctrl +> action(reducer)

	 					--reducers(pure fn)--
	 					 --- Middleware---
								 ||
								Logger
								Async
╔═════════╗       ╔════════════╗         ╔════════╗         ╔═════════════════╗
║ Actions ║────>──║ Dispatchet ║ ───────>║ Stores ║────────>║ View Components ║
╚═════════╝       ╚════════════╝         ╚════════╝         ╚═════════════════╝
                      ^                                             │
                      │                 ╔═════════╗                 │
                       ──────────────── ║ Actions ║ ───────────────
                                        ╚═════════╝

```