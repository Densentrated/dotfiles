#!/bin/bash

# ask user if they want applications installed
# If so set a boolean flag to true
echo "WARNING! This script is meant for, and probably only works on Arch Linux"
read -p "Do you want to install additional applications along with the required ones? Y / N" INPUT

# validate the input
if [[ "${INPUT^^}" == "Y" ]]; then
  flag=true
elif [[ "${INPUT^^}" == "N" ]]; then
  flag=false
else
  echo "Invalid input, Please retry with a valid answer"
  exit 1
fi

# running a system update just in case
sudo pacman -Syu

# installing all the required utilities
yay -S fish kitty neofetch spotify spicetify-cli hyprland hyprpaper hyprlock waybar starship mako rofi fish zsh grim slurp

# if boolean flag set to true, install the additional applications
if [[ $flag = true ]]; then
  echo "installing external utilities"
  yay -S install visual-studio-code-bin firefox-developer-edition firefox thunar cmatrix cbonsai steam heroic games launcher
else
  echo "external utilities will not be installed"
fi

# copying files into the start directory
OGDIR="./.config"
DESTDIR="~/.config"

if [ ! -d "$DESTDIR" ]; then
  echo "Destination directory $DESTDIR does not exist."
  echo "Creating directory $DESTDIR"
  mkdir "$DESTDIR"
fi

mv "$OGDIR"/* "$DESTDIR"
cp -a "$OGDIR" "$DESTDIR"

# copying picture files into the picture directory
PICTURESDIR="./Pictures"
DESTPICTURESDIR="~/Pictures"

if [ -d "$PICTURESDIR" ]; then
  echo "Copying pictures to $DESTPICTURESDIR"
  if [ ! -d "$DESTPICTURESDIR" ]; then
    mkdir -p "$DESTPICTURESDIR"
  fi
  cp -a "$PICTURESDIR"/* "$DESTPICTURESDIR"
else
  echo "No Pictures directory found to copy."
fi



