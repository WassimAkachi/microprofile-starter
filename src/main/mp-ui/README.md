Web UI
===================

You can use plain `npm` but `pnpm`is recommended because it is: 
> "Fast, disk space efficient package manager" - source https://pnpm.io/ 
> and https://pnpm.io/motivation


Install `pnpm`
--------------

```shell
npm install -g pnpm
```

Install npm dependencies
--------------------------

```shell
pnpm install
```

Start the Web UI while developing
---------------------------------

```shell
pnpm run dev
```

Build the Web UI
---------------------------------

```shell
pnpm run clean && pnpm run build
```

The Web UI deployable is located in `./dist` 

Clean up the build of the Web UI
---------------------------------

```shell
pnpm run clean
```
