#!/bin/bash

# Volume control script with notifications for niri

ACTION="$1"

# Get current volume and mute status
get_volume() {
    wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{print int($2 * 100)}'
}

get_mute_status() {
    wpctl get-volume @DEFAULT_AUDIO_SINK@ | grep -q "MUTED" && echo "yes" || echo "no"
}

# Perform the action
case "$ACTION" in
    up)
        wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.02+
        ;;
    down)
        wpctl set-volume @DEFAULT_AUDIO_SINK@ 0.02-
        ;;
    mute)
        wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle
        ;;
    *)
        echo "Usage: $0 {up|down|mute}"
        exit 1
        ;;
esac

# Get the new volume level
VOLUME=$(get_volume)
MUTED=$(get_mute_status)

# Prepare notification
if [ "$MUTED" = "yes" ]; then
    ICON="audio-volume-muted"
    MESSAGE="Muted"
    URGENCY="normal"
else
    MESSAGE="Volume: ${VOLUME}%"
    URGENCY="low"

    # Choose icon based on volume level
    if [ "$VOLUME" -ge 70 ]; then
        ICON="audio-volume-high"
    elif [ "$VOLUME" -ge 30 ]; then
        ICON="audio-volume-medium"
    elif [ "$VOLUME" -gt 0 ]; then
        ICON="audio-volume-low"
    else
        ICON="audio-volume-muted"
    fi
fi

# Send notification with center positioning hint
# Note: Center positioning depends on notification daemon support
notify-send -u "$URGENCY" -t 1500 -a "Volume" -h string:x-canonical-private-synchronous:volume -h int:value:"$VOLUME" "$MESSAGE" -i "$ICON"
