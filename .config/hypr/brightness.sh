CURRENTBRIGHTNESS=$(blight get)
FIRSTARGUMENT=$1

# Run the command using the retrieved value as a parameter
if [ "$FIRSTARGUMENT" = "up" ]; then
    NEWBRIGHTNESS=$(($CURRENTBRIGHTNESS+5))
    if (( $NEWBRIGHTNESS < 100 )); then
        blight set $NEWBRIGHTNESS
    fi
elif [ "$FIRSTARGUMENT" = "down" ]; then
    NEWBRIGHTNESS=$(($CURRENTBRIGHTNESS-5))
    if (( $NEWBRIGHTNESS > 5 )); then
        blight set $NEWBRIGHTNESS
    fi
fi