if status is-interactive
    keychain ~/.ssh/id_ed25519 --quiet
    set -l HOSTNAME (hostname)
    if test -f ~/.keychain/$HOSTNAME-fish
        source ~/.keychain/$HOSTNAME-fish
    end
end

