#!/usr/bin/env bash

PUBLIC="./icons";
ASSETS="./src/components/icons/assets";

files=$(find $PUBLIC -type f -name '*.svg' | sort);

if ((${#files[@]})); then
  npx eslint -c .eslintrc --fix "${PUBLIC}/*.svg" --no-ignore;

  for path in $files
  do
    file_name="${path##*/}";

    # Remove file extension
    # some-icon.svg -> some-icon
    icon_name=${file_name%.svg};

    # get icon component path
    tsx_file="$ASSETS/$icon_name.icon.tsx"

    # Generate component name
    # some-icon -> SomeIconIcon
    component_name="$(perl -pe 's/(^|-)(\w)/\U$2/g' <<< "$icon_name")Icon";

    # remove file if exist
    if test -f "$tsx_file"; then
        rm "$tsx_file"
    fi

    # add new file
    touch "$tsx_file"

    svg=$(cat "$path");
    svg=${svg/";"};
    svg="$(perl -pe 's/ className=\".*\" /{ ...props }/g' <<< "$svg")";
    svg="$(perl -pe 's/<title>.*<\/title>//g' <<< "$svg")";

    printf %s "import { FC, SVGProps } from 'react';

    export const $component_name: FC<SVGProps<SVGSVGElement>> = props => {
        return (
            $svg
        );
    };
    " >> "$tsx_file";

    # Deleting svg files
    rm -f "$path";

    printf "#";
  done;

  # Lint generated icons
  npx prettier -c .prettierrc -u -w "$ASSETS";

  # DOne
  printf "\nSVG icons exported\n";
fi

