;;; $DOOMDIR/config.el -*- lexical-binding: t; -*-

;; Place your private configuration here! Remember, you do not need to run 'doom
;; sync' after modifying this file!


;; Some functionality uses this to identify you, e.g. GPG configuration, email
;; clients, file templates and snippets. It is optional.
;; (setq user-full-name "John Doe"
;;       user-mail-address "john@doe.com")

;; Doom exposes five (optional) variables for controlling fonts in Doom:
;;
;; - `doom-font' -- the primary font to use
;; - `doom-variable-pitch-font' -- a non-monospace font (where applicable)
;; - `doom-big-font' -- used for `doom-big-font-mode'; use this for
;;   presentations or streaming.
;; - `doom-symbol-font' -- for symbols
;; - `doom-serif-font' -- for the `fixed-pitch-serif' face
;;
;; See 'C-h v doom-font' for documentation and more examples of what they
;; accept. For example:
;;
;;(setq doom-font (font-spec :family "Fira Code" :size 12 :weight 'semi-light)
;;      doom-variable-pitch-font (font-spec :family "Fira Sans" :size 13))
;;
;; If you or Emacs can't find your font, use 'M-x describe-font' to look them
;; up, `M-x eval-region' to execute elisp code, and 'M-x doom/reload-font' to
;; refresh your font settings. If Emacs still can't find your font, it likely
;; wasn't installed correctly. Font issues are rarely Doom issues!

;; There are two ways to load a theme. Both assume the theme is installed and
;; available. You can either set `doom-theme' or manually load a theme with the
;; `load-theme' function. This is the default:
(setq doom-theme 'doom-one)

;; This determines the style of line numbers in effect. If set to `nil', line
;; numbers are disabled. For relative line numbers, set this to `relative'.
(setq display-line-numbers-type t)

;; If you use `org' and don't want your org files in the default location below,
;; change `org-directory'. It must be set before org loads!
(setq org-directory "~/org/")


;; Whenever you reconfigure a package, make sure to wrap your config in an
;; `with-eval-after-load' block, otherwise Doom's defaults may override your
;; settings. E.g.
;;
;;   (with-eval-after-load 'PACKAGE
;;     (setq x y))
;;
;; The exceptions to this rule:
;;
;;   - Setting file/directory variables (like `org-directory')
;;   - Setting variables which explicitly tell you to set them before their
;;     package is loaded (see 'C-h v VARIABLE' to look them up).
;;   - Setting doom variables (which start with 'doom-' or '+').
;;
;; Here are some additional functions/macros that will help you configure Doom.
;;
;; - `load!' for loading external *.el files relative to this one
;; - `add-load-path!' for adding directories to the `load-path', relative to
;;   this file. Emacs searches the `load-path' when you load packages with
;;   `require' or `use-package'.
;; - `map!' for binding new keys
;;
;; To get information about any of these functions/macros, move the cursor over
;; the highlighted symbol at press 'K' (non-evil users must press 'C-c c k').
;; This will open documentation for it, including demos of how they are used.
;; Alternatively, use `C-h o' to look up a symbol (functions, variables, faces,
;; etc).
;;
;; You can also try 'gd' (or 'C-c c d') to jump to their definition and see how
;; they are implemented.
;; custome rules of cardozQBSD system 
;; =============================================================================
;; 1. WINDOW SIZE, BORDER & POSITION
;; =============================================================================

;; Force Emacs to start maximized (or full-screen) like your Neovim terminal
(add-to-list 'default-frame-alist '(fullscreen . maximized))

;; Add clean internal padding so code doesn't stick to window borders
(add-to-list 'default-frame-alist '(internal-border-width . 12))

;; Enable relative line numbers (Matches Neovim default)
(setq display-line-numbers-type 'relative)


;; =============================================================================
;; 2. LAZYVIM COLOR THEME & FONTS
;; =============================================================================

;; Tokyo Night is the exact default theme used by LazyVim!
(setq doom-theme 'doom-tokyo-night)

;; Set font (JetBrains Mono or Fira Code match the crisp look)
(setq doom-font (font-spec :family "JetBrains Mono" :size 15 :weight 'medium)
      doom-variable-pitch-font (font-spec :family "Sans" :size 15))


;; =============================================================================
;; 3. CLEAN UP UI (Neovim Minimalist Look)
;; =============================================================================

;; Hide title bar / window decorations if supported by your window manager
;; (optional, uncomment if you want a frameless look):
;; (add-to-list 'default-frame-alist '(undecorated . t))
;; =============================================================================
;; 4. CODE SUGGESTIONS & AUTOCOMPLETE (Corfu / nvim-cmp style)
;; =============================================================================

(after! corfu
  (setq corfu-auto t                 ; Show suggestions automatically as you type
        corfu-auto-delay 0.05        ; Instant popup (50ms delay)
        corfu-auto-prefix 1          ; Trigger after typing just 1 character
        corfu-cycle t                ; Wrap around top/bottom when cycling candidates
        corfu-preselect 'prompt      ; Preselect first candidate
        corfu-doc-delay 0.2          ; Quick doc popup next to suggestion
        corfu-popupinfo-mode t))     ; Show hover docs next to selected candidate

;; Make TAB and Shift-TAB cycle through completion suggestions like Vim
(map! :map corfu-map
      "TAB"     #'corfu-next
      "<tab>"   #'corfu-next
      "S-TAB"   #'corfu-previous
      "<backtab>" #'corfu-previous
      "RET"     #'corfu-insert
      "<return>" #'corfu-insert)
;; =============================================================================
;; 4 RUST & LSP-MODE CONFIGURATION
;; =============================================================================

;; Ensure /usr/local/bin is in PATH for Emacs
(add-to-list 'exec-path "/usr/local/bin")
(setenv "PATH" (concat "/usr/local/bin:" (getenv "PATH")))

;; Configure LSP-mode settings for large workspaces like OpenObserve
(after! lsp-mode
  (setq lsp-rust-analyzer-server-command '("/usr/local/bin/rust-analyzer")
        lsp-signature-auto-activate t
        lsp-inlay-hint-enable t
        lsp-lens-enable t))

;; Tell Doom to explicitly use lsp-mode instead of eglot for Rust
(setq-hook! 'rust-mode-hook +lsp-company-backends '(company-capf))
;; =============================================================================
;; 5 CODE SUGGESTIONS & AUTOCOMPLETION (LazyVim nvim-cmp style)
;; =============================================================================

(after! corfu
  (setq corfu-auto t                 ; Enable automatic popup menu as you type
        corfu-auto-delay 0.05        ; Super fast popup trigger (50ms)
        corfu-auto-prefix 1          ; Trigger after typing just 1 character
        corfu-cycle t                ; Wrap around when cycling top/bottom
        corfu-preselect 'prompt      ; Select top suggestion automatically
        corfu-popupinfo-delay 0.2    ; Quick documentation preview popup
        corfu-popupinfo-mode t))     ; Show doc window alongside completion popup

;; Match Vim-style completion keybindings
(map! :map corfu-map
      "TAB"        #'corfu-next
      "<tab>"      #'corfu-next
      "S-TAB"      #'corfu-previous
      "<backtab>"  #'corfu-previous
      "C-n"        #'corfu-next
      "C-p"        #'corfu-previous
      "RET"        #'corfu-insert
      "<return>"   #'corfu-insert
      "C-g"        #'corfu-quit)
(after! lsp-mode
  (setq lsp-completion-provider :capf          ; Use CAPF (Corfu bridge)
        lsp-completion-show-detail t           ; Show function parameters/types
        lsp-completion-show-kind t             ; Show icons/kinds (struct, fn, var)
        lsp-enable-snippet t                   ; Expand Rust snippets automatically
        lsp-enable-symbol-highlighting t))
