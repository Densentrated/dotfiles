# Initialize Starship prompt
eval "$(starship init zsh)"

# Run fastfetch on terminal startup
fastfetch

alias pipes='pipes.sh -t 3 -f 75 -p 5 -r 2000'
alias c45='tput setaf 4; termdown 45m --font big; tput sgr0'
