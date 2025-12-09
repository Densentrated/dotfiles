#!/bin/bash

playerctl -p spotify metadata --follow --format '{{artist}}|{{title}}|{{mpris:artUrl}}' | while IFS='|' read -r artist title art_url; do
    # Download album art temporarily
    art_path="/tmp/spotify-current.jpg"
    curl -s "$art_url" -o "$art_path"

    notify-send "Now Playing" "$title\n$artist" -i "$art_path" -t 15000 -a "Spotify"
done
