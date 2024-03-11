#!/usr/bin/env bash

LATEST_TAG=$(git describe --tags --abbrev=0)
echo "Latest version of application: ${LATEST_TAG/v/}"

# Update version
VERSION=""
IFS='.' read -r -a array <<<"${LATEST_TAG/v/}"
next=$((array[2] + 1))

VERSION="${array[0]}.${array[1]}.$next"

printf %s ".
.
.
The new release will have a number [ $VERSION ]
"
read -r -p "Press \"Enter\" to continue or write a new version: " NEW_VERSION

if [[ "$NEW_VERSION" ]]; then
  VERSION=$NEW_VERSION

  printf %s ".
  .
  .
  Are you sure you want to upgrade the app version to [ $VERSION ]?
  "

  read -r -p "Press enter to continue or CTRL+C to cancel"
fi

# lets check if there is any modified file in working copy
git diff-index --quiet HEAD
if [[ $? == 1 ]]; then
  git add .
  git commit -m "$VERSION"
fi

# Pull latest version of main branch
git checkout main --quiet
git pull --quiet

if [ "$(git tag -l "$VERSION")" ]; then
  echo "[Error] Git tag $VERSION already present"
  exit 1
fi

# Update npm
npm version "$VERSION"

# commit all changes were made in previous steps
git commit -a --message="v$VERSION"

# push both changes & tag we made
git push origin main "v$VERSION"