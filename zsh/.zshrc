# ── History ───────────────────────────────────────────
HISTFILE=~/.histfile
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS       # don't save duplicate commands
setopt HIST_IGNORE_SPACE      # don't save commands starting with space
setopt SHARE_HISTORY          # share history across terminals
setopt APPEND_HISTORY         # append instead of overwrite

# ── Keybindings ───────────────────────────────────────
bindkey -e                    # emacs keybindings (Ctrl+A, Ctrl+E, etc.)
bindkey '^[[A' history-search-backward   # Up arrow: search history
bindkey '^[[B' history-search-forward    # Down arrow: search history
bindkey '^[[H' beginning-of-line         # Home key
bindkey '^[[F' end-of-line               # End key
bindkey '^[[3~' delete-char              # Delete key

# ── Completion ────────────────────────────────────────
autoload -Uz compinit
compinit
zstyle :compinstall filename '/home/shane/.zshrc'
zstyle ':completion:*' menu select                  # arrow-key menu
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}' # case-insensitive
zstyle ':completion:*' list-colors ''               # colored completions
zstyle ':completion:*:descriptions' format '%B%d%b'
zstyle ':completion::complete:*' gain-privileges 1  # sudo completion

# ── Useful options ────────────────────────────────────
setopt AUTO_CD                # type a dir name to cd into it
setopt CORRECT                # suggest correction for mistyped commands
setopt GLOB_DOTS              # include dotfiles in globs
setopt INTERACTIVE_COMMENTS   # allow # comments in shell

# ── Aliases ───────────────────────────────────────────
alias ls='ls --color=auto'
alias ll='ls -lah --color=auto'
alias la='ls -A --color=auto'
alias grep='grep --color=auto'
alias ..='cd ..'
alias ...='cd ../..'
alias cls='clear'

# FreeBSD specific
alias pkg-update='sudo pkg update && sudo pkg upgrade'
alias ports='cd /usr/ports'
alias kldstat='kldstat -v'

# ── Plugins (if installed via pkg) ────────────────────

# Syntax highlighting — install with: sudo pkg install zsh-syntax-highlighting
if [ -f /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]; then
  source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi

# Autosuggestions — install with: sudo pkg install zsh-autosuggestions
if [ -f /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh ]; then
  source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
  ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=#414868'   # dim ghost text color
  ZSH_AUTOSUGGEST_STRATEGY=(history completion)
fi

# ── Starship prompt ───────────────────────────────────
eval "$(starship init zsh)"

#--- labctl cli ----------------------------------------
export PATH="$HOME/.local/bin:$PATH"

if command -v labctl >/dev/null 2>&1; then
    source <(labctl completion zsh)
fi

#---Golang PATH----------------------------------------
export GOPATH="$HOME/.local/share/go"
export PATH="$GOPATH/bin:$PATH"
export PATH="/usr/local/bin:$PATH"
autoload -Uz zcalc

#----Java PATH-----------------------------------------
export JAVA_HOME=/usr/local/openjdk21
export PATH="$JAVA_HOME/bin:$PATH"

export PATH="$HOME/dlang/dmd-2.112.0/freebsd/bin64:$PATH"

#---Rust-analyzer---LSP-Configuration------------------

# Increase maximum open files and stack limit for rust-analyzer
ulimit -n 10240
ulimit -s 32768
