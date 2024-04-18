THISDIR="./"
DOTFILEDIR="~/.config"

if [ ! -d "$DOTFILEDIR" ]; then
  echo "Destination directory $DOTFILEDIR does not exist."
  echo "Creating directory $DOTFILEDIR"
  mkdir "$DOTFILEDIR"
fi

mv "$THISDIR"/* "$DOTFILEDIR"