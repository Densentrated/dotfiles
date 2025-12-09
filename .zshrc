# Initialize Starship prompt
eval "$(starship init zsh)"

# Run fastfetch on terminal startup
fastfetch

alias pipes='pipes.sh -t 3 -f 75 -p 5 -r 2000'
alias termdown='tput setaf 4; termdown 45m --font big; tput sgr0'
alias cmatrix='cmatrix -B -C magenta'
alias bonsai='cbonsai -l -k 213,21,219,33 -L 65 -M 6 -t .005 -i'
export PATH="$HOME/.local/share/npm-global/bin:$PATH"
