# PHOQER UI LIBRARY

### Prerequisites

- `node` 14.15.0 or higher.
- `yarn` 1.22 or higher.


### How to run storybook locally

Run next command and open browser on: http://localhost:6006

```bash
yarn dev
```

### How to run storybook with docker

```bash
docker-compose up --build --remove-orphans -d 
```

### Add new icon:

Place svg icon into `icons` folder in app root.
Pay attention to the file name as the name of the component will be taken from there.

Run command:
```bash
yarn icons
```

New icon component name will be generated as follows `search.svg -> SearchIcon`.
Each icon should have `Icon` prefix to make it easy to distinguish the icon components from other

## Publish new version

Run this comment and follow the instructions
```bash
yarn release
```