if status is-interactive
    # Commands to run in interactive sessions can go here
    starship init fish | source
end
# Removed sourcing of non-existent /home/dense/.cargo/env.fish

# User abbreviations
abbr -a -g ytmp3 'youtube-dl --extract-audio --audio-format mp3'				# Convert/Download YT videos as mp3
abbr -a -g cls 'clear'																								# Clear
abbr -a -g h 'history'																								# Show history
abbr -a -g upd 'paru -Syu --noconfirm'																								# Update everything
abbr -a -g please 'sudo'																						# Polite way to sudo
abbr -a -g fucking 'sudo'																						# Rude way to sudo
abbr -a -g sayonara 'shutdown now'																	# Epic way to shutdown
abbr -a -g stahp 'shutdown now'																		# Panik - stonk man
abbr -a -g ar 'echo "awesome.restart()" | awesome-client'							# Reload AwesomeWM
abbr -a -g shinei 'kill -9'																						# Kill ala DIO
abbr -a -g kv 'kill -9 (pgrep vlc)'																			# Kill zombie vlc
abbr -a -g priv 'fish --private'																				# Fish incognito mode
abbr -a -g sshon 'sudo systemctl start sshd.service'										# Start ssh service
abbr -a -g sshoff 'sudo systemctl stop sshd.service'										# Stop ssh service
abbr -a -g untar 'tar -zxvf'																					# Untar
abbr -a -g genpass 'openssl rand -base64 20'													# Generate a random, 20-charactered password
abbr -a -g sha 'shasum -a 256'																			# Test checksum
abbr -a -g cn 'ping -c 5 8.8.8.8'																			# Ping google, checking network
abbr -a -g ipe 'curl ifconfig.co'																				# Get external IP address
abbr -a -g ips 'ip link show'																					# Get network interfaces information
abbr -a -g wloff 'rfkill block wlan'																			# Block wlan, killing wifi connection
abbr -a -g wlon 'rfkill unblock wlan'																		# Unblock wlan, start wifi connection
abbr -a -g ff 'firefox'
abbr -a -g CHROME_EXECUTABLE "google-chrome-stable"
abbr -a -g google-crhome "google-chrome-stable"
set -g fish_greeting

neofetch --ascii ~/.config/neofetch/yorha.txt --ascii_colors 1
fish_add_path /opt/matlab/bin

# Add ~/.local/bin to PATH (ensures no duplicates are added)
fish_add_path $HOME/.local/bin

# Created by `pipx` on 2025-10-06 01:54:03
set PATH $PATH /home/densentrated/.local/bin

# Created for NERVENV on 2025-10-9
alias nervenv="source /home/dense/Projects/Academic/NER/ner-venv/bin/activate.fish"

# thefuck alias
thefuck --alias | source
