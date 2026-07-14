(function () {
    "use strict";

    var base = document.querySelector('script[src*="js/terminal.js"]');
    var siteRoot = base ? base.getAttribute("data-root") || base.src.replace(/\/js\/terminal\.js.*/, "/") : "";

    function resolve(path) {
        if (path.charAt(0) === "/") return path;
        return siteRoot + path;
    }

    function currentPage() {
        var path = window.location.pathname;
        var file = path.split("/").pop() || "index.html";
        return file;
    }

    function currentDir() {
        var path = window.location.pathname;
        var parts = path.split("/");
        parts.pop();
        return parts.join("/") + "/";
    }

    var PROMPT = "\x1b[1;36mshane@freebsd\x1b[0m \x1b[1;33m~\x1b[0m $ ";
    var ACCENT = "\x1b[1;36m";
    var GREEN = "\x1b[1;32m";
    var YELLOW = "\x1b[1;33m";
    var RED = "\x1b[1;31m";
    var RESET = "\x1b[0m";
    var BOLD = "\x1b[1m";
    var DIM = "\x1b[2m";
    var WHITE = "\x1b[1;37m";

    var FREEBSD_SMALL =
        ACCENT + " /\\,-" + WHITE + "'''''-" + ACCENT + ",/\\ " + RESET + "\n" +
        " \\_)       (_/ \n" +
        " |           | \n" +
        " |           | \n" +
        " ;         ;  \n" +
        "  '-_____-'" ;

    var WELCOME_ART =
        "\x1b[1;36m" +
        " _______ __                            ______              __\n" +
        "|     __|  |--.---.-.-----.-----.    |      |.-----.----.|  |\n" +
        "|__     |     |  _  |     |  -__|    |   ---||  _  |   _||__|\n" +
        "|_______|__|__|___._|__|__|_____|    |______||_____|__|" + RESET + "\n" +
        DIM + " FreeBSD | Linux | eBPF | Performance Engineering" + RESET;

    var MOTD =
        "\n" +
        "Welcome to shanecardoz.github.io\n" +
        DIM + "Type " + GREEN + "help" + RESET + DIM + " for available commands.\n" + RESET;

    var SITE_INFO = {
        "~":     { desc: "Home page — Shane Cardoz",           html: "index.html",     cmd: "cd ~" },
        "blog":  { desc: "Blog — technical writing",           html: "blog/index.html", cmd: "cd blog" },
        "about": { desc: "About — bio, interests, workstation", html: "about.html",     cmd: "cd about" },
        "rss":   { desc: "RSS — syndication feed",             html: "rss/feed.xml",   cmd: "cd rss" }
    };

    var FILE_CONTENTS = {
        "index.txt": "Home page of shanecardoz.github.io\nSystems, kernels, performance engineering, and low-level debugging.",
        "about.txt": "Shane Cardoz — systems programmer interested in\nFreeBSD, Linux, eBPF, observability, and performance engineering.",
        "blog.txt":  "Blog archive — longer writing on systems, performance,\nkernels, and engineering habits.",
        "rss.txt":   "RSS feed available at rss/feed.xml\nSubscribe for updates."
    };

    var COMMANDS = [
        "help", "ls", "cd", "cat", "whoami", "uname",
        "neofetch", "clear", "theme", "exit", "man"
    ];

    var history = [];
    var historyIndex = -1;
    var currentInput = "";
    var term = null;
    var fitAddon = null;
    var cwd = "~";

    function getPrompt() {
        var dirPart = cwd === "~" ? "~" : cwd;
        return "\x1b[1;36mshane@freebsd\x1b[0m \x1b[1;33m" + dirPart + "\x1b[0m $ ";
    }

    function resolvePath(arg) {
        if (!arg) return cwd;
        if (arg === "~" || arg === "~/") return "~";
        if (arg === "..") {
            if (cwd === "~") return "~";
            var parts = cwd.split("/");
            parts.pop();
            return parts.length <= 1 ? "~" : parts.join("/");
        }
        if (arg.charAt(0) === "/") return arg;
        if (cwd === "~") return "~/" + arg;
        return cwd + "/" + arg;
    }

    function pathToUrl(path) {
        if (path === "~" || path === "~/") return resolve("index.html");
        var clean = path.replace(/^~\//, "").replace(/\/$/, "");
        return resolve(clean + ".html");
    }

    function print(text) {
        term.writeln(text);
    }

    function println(text) {
        term.writeln(text);
    }

    function cmdHelp() {
        println("");
        println(WHITE + "Available commands:" + RESET);
        println("");
        println("  " + GREEN + "help" + RESET + "         Show this help message");
        println("  " + GREEN + "ls" + RESET + "           List site sections");
        println("  " + GREEN + "cd" + RESET + " <dir>     Navigate to a section");
        println("  " + GREEN + "cat" + RESET + " <file>    Show file contents");
        println("  " + GREEN + "whoami" + RESET + "        Display user info");
        println("  " + GREEN + "uname" + RESET + " [-a]    Display system info");
        println("  " + GREEN + "neofetch" + RESET + "       System info with ASCII art");
        println("  " + GREEN + "clear" + RESET + "          Clear terminal");
        println("  " + GREEN + "theme" + RESET + "          Toggle dark/light theme");
        println("  " + GREEN + "exit" + RESET + "           Collapse terminal");
        println("  " + GREEN + "man" + RESET + " <cmd>     Show manual for a command");
        println("");
    }

    function cmdLs() {
        println("");
        var keys = Object.keys(SITE_INFO);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var info = SITE_INFO[k];
            var name = k === "~" ? "~/" : k + "/";
            var active = false;
            if (k === "~" && cwd === "~") active = true;
            else if (k !== "~" && cwd.indexOf(k) !== -1) active = true;

            if (active) {
                println("  " + GREEN + name + RESET + "  " + DIM + info.desc + RESET);
            } else {
                println("  " + WHITE + name + RESET + "  " + DIM + info.desc + RESET);
            }
        }
        println("");
    }

    function cmdCd(arg) {
        if (!arg || arg === "~") {
            cwd = "~";
            updateTitlebar("~");
            return;
        }

        var resolved = resolvePath(arg);
        var targetUrl = pathToUrl(resolved);

        for (var k in SITE_INFO) {
            var info = SITE_INFO[k];
            var testUrl = pathToUrl(resolved);
            if (testUrl.indexOf(info.html) !== -1 || resolved === k || resolved === "~/" + k) {
                window.location.href = targetUrl;
                return;
            }
        }

        println(RED + "cd: no such section: " + RESET + arg);
    }

    function cmdCat(arg) {
        if (!arg) {
            println(RED + "cat: missing file operand" + RESET);
            return;
        }

        var content = FILE_CONTENTS[arg];
        if (content) {
            println("");
            println(content);
            println("");
            return;
        }

        var keys = Object.keys(FILE_CONTENTS);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].replace(".txt", "") === arg.replace(".txt", "")) {
                println("");
                println(FILE_CONTENTS[keys[i]]);
                println("");
                return;
            }
        }

        println(RED + "cat: " + arg + ": No such file or directory" + RESET);
    }

    function cmdWhoami() {
        println("shane");
    }

    function cmdUname(args) {
        if (args && args.indexOf("-a") !== -1) {
            println("FreeBSD freebsd 14.1-RELEASE FreeBSD 14.1-RELEASE GENERIC amd64");
        } else {
            println("FreeBSD");
        }
    }

    function cmdNeofetch() {
        println("");
        var lines = FREEBSD_SMALL.split("\n");
        var info = [
            BOLD + ACCENT + "shane" + RESET + DIM + "@" + RESET + ACCENT + "freebsd" + RESET,
            "",
            BOLD + "OS" + RESET + "      FreeBSD 14.1-RELEASE",
            BOLD + "Kernel" + RESET + "   FreeBSD 14.1-RELEASE GENERIC",
            BOLD + "Shell" + RESET + "    /bin/sh",
            BOLD + "Editor" + RESET + "    vim",
            BOLD + "Terminal" + RESET + "  xterm.js",
            BOLD + "CPU" + RESET + "      x86_64",
            BOLD + "Memory" + RESET + "   -- / --",
            "",
            GREEN + "  " + BOLD + "@" + RESET + RED + "#" + RESET + GREEN + "$" + RESET + YELLOW + "%" + RESET + WHITE + "&" + RESET + ACCENT + "*" + RESET + GREEN + "~" + RESET + RED + "+" + RESET + YELLOW + "=" + RESET
        ];

        var maxLines = Math.max(lines.length, info.length);
        for (var i = 0; i < maxLines; i++) {
            var left = (i < lines.length) ? lines[i] : "                    ";
            var right = (i < info.length) ? info[i] : "";
            println("  " + left + "    " + right);
        }
        println("");
    }

    function cmdTheme() {
        var dark = document.getElementById("theme-dark");
        var light = document.getElementById("theme-light");
        if (dark && dark.checked) {
            light.checked = true;
        } else if (dark) {
            dark.checked = true;
        }
        var icon = dark && dark.checked ? "\u263E" : "\u2600";
        document.querySelectorAll(".theme-toggle").forEach(function (b) {
            b.textContent = icon;
        });
        if (term) {
            if (dark && dark.checked) {
                term.options.theme = {
                    background: "#0a0a0a",
                    foreground: "#d4d4d4",
                    cursor: "#64ffda",
                    cursorAccent: "#0a0a0a",
                    selectionBackground: "rgba(100, 255, 218, 0.2)",
                    black: "#0a0a0a",
                    red: "#ff7b72",
                    green: "#64ffda",
                    yellow: "#d8b15f",
                    blue: "#79c0ff",
                    magenta: "#d2a8ff",
                    cyan: "#64ffda",
                    white: "#d4d4d4",
                    brightBlack: "#737373",
                    brightRed: "#ff7b72",
                    brightGreen: "#64ffda",
                    brightYellow: "#d8b15f",
                    brightBlue: "#79c0ff",
                    brightMagenta: "#d2a8ff",
                    brightCyan: "#64ffda",
                    brightWhite: "#ffffff"
                };
            } else {
                term.options.theme = {
                    background: "#ffffff",
                    foreground: "#171717",
                    cursor: "#0d9373",
                    cursorAccent: "#ffffff",
                    selectionBackground: "rgba(13, 147, 115, 0.2)",
                    black: "#171717",
                    red: "#ff7b72",
                    green: "#0d9373",
                    yellow: "#875900",
                    blue: "#0969da",
                    magenta: "#8250df",
                    cyan: "#0d9373",
                    white: "#171717",
                    brightBlack: "#666666",
                    brightRed: "#ff7b72",
                    brightGreen: "#0d9373",
                    brightYellow: "#875900",
                    brightBlue: "#0969da",
                    brightMagenta: "#8250df",
                    brightCyan: "#0d9373",
                    brightWhite: "#ffffff"
                };
            }
        }
    }

    function cmdClear() {
        term.clear();
    }

    function cmdExit() {
        var sidebar = document.querySelector(".sidebar");
        if (sidebar) {
            sidebar.classList.add("sidebar--collapsed");
        }
        var toggle = document.querySelector(".sidebar-toggle");
        if (toggle) {
            toggle.textContent = "\u25C0";
        }
        document.body.classList.add("body--terminal-collapsed");
    }

    function cmdMan(cmd) {
        if (!cmd) {
            println(RED + "What manual page do you want?" + RESET);
            return;
        }
        var manuals = {
            "help":      "help - show available commands\n\nUsage: help\n\nLists all available terminal commands.",
            "ls":        "ls - list site sections\n\nUsage: ls\n\nShows available sections: ~ (home), blog, about, rss.",
            "cd":        "cd - change directory (navigate)\n\nUsage: cd <directory>\n\nNavigate to a site section.\n  cd ~      Go to home page\n  cd blog   Go to blog\n  cd about  Go to about page\n  cd rss    Go to RSS feed",
            "cat":       "cat - display file contents\n\nUsage: cat <filename>\n\nShow contents of a file.\n  cat about.txt\n  cat blog.txt\n  cat index.txt\n  cat rss.txt",
            "whoami":    "whoami - display current user\n\nUsage: whoami",
            "uname":     "uname - print system information\n\nUsage: uname [-a]\n\nWithout flags: prints OS name.\n  -a  Prints full system info.",
            "neofetch":  "neofetch - system information display\n\nUsage: neofetch\n\nDisplays system info with ASCII art.",
            "clear":     "clear - clear the terminal screen\n\nUsage: clear",
            "theme":     "theme - toggle dark/light theme\n\nUsage: theme\n\nSwitches between dark and light color schemes.",
            "exit":      "exit - collapse the terminal\n\nUsage: exit\n\nHides the terminal panel.",
            "man":       "man - display manual page\n\nUsage: man <command>\n\nShows help for a specific command."
        };
        var m = manuals[cmd];
        if (m) {
            println("");
            var lines = m.split("\n");
            for (var i = 0; i < lines.length; i++) {
                if (i === 0) {
                    println(BOLD + WHITE + lines[i] + RESET);
                } else {
                    println(lines[i]);
                }
            }
            println("");
        } else {
            println(RED + "No manual entry for " + cmd + RESET);
        }
    }

    function processCommand(input) {
        var trimmed = input.trim();
        if (!trimmed) return;

        history.push(trimmed);
        historyIndex = history.length;

        var parts = trimmed.split(/\s+/);
        var cmd = parts[0].toLowerCase();
        var args = parts.slice(1).join(" ");

        switch (cmd) {
            case "help":    cmdHelp(); break;
            case "ls":      cmdLs(); break;
            case "cd":      cmdCd(args); break;
            case "cat":     cmdCat(args); break;
            case "whoami":  cmdWhoami(); break;
            case "uname":   cmdUname(args); break;
            case "neofetch":cmdNeofetch(); break;
            case "clear":   cmdClear(); break;
            case "theme":   cmdTheme(); break;
            case "exit":    cmdExit(); break;
            case "man":     cmdMan(args); break;
            case "pwd":     println("/" + cwd.replace("~", "")); break;
            case "echo":    println(args); break;
            case "date":    println(new Date().toString()); break;
            case "lsb_release":
                println("FreeBSD 14.1-RELEASE");
                break;
            default:
                println(RED + cmd + ": command not found" + RESET);
                println(DIM + "Type 'help' for available commands." + RESET);
                break;
        }
    }

    function updateTitlebar(dir) {
        var titleEl = document.querySelector(".terminal-title");
        if (titleEl) {
            titleEl.textContent = "shane@freebsd \u2014 " + dir;
        }
    }

    function getTabCompletions(input) {
        var parts = input.split(/\s+/);
        if (parts.length <= 1) {
            return COMMANDS.filter(function (c) {
                return c.indexOf(parts[0]) === 0;
            });
        }
        var cmd = parts[0].toLowerCase();
        var partial = parts[parts.length - 1];
        if (cmd === "cd") {
            var dirs = Object.keys(SITE_INFO);
            dirs.push("~");
            return dirs.filter(function (d) {
                return d.indexOf(partial) === 0;
            });
        }
        if (cmd === "cat") {
            var files = Object.keys(FILE_CONTENTS);
            return files.filter(function (f) {
                return f.indexOf(partial) === 0;
            });
        }
        if (cmd === "man") {
            return COMMANDS.filter(function (c) {
                return c.indexOf(partial) === 0;
            });
        }
        return [];
    }

    function initTerminal() {
        var container = document.getElementById("terminal");
        if (!container) return;

        var Terminal = window.Terminal;
        var FitAddon = window.FitAddon;

        if (!Terminal || !FitAddon) {
            println(RED + "Error: xterm.js not loaded." + RESET);
            return;
        }

        fitAddon = new FitAddon.FitAddon();

        term = new Terminal({
            cursorBlink: true,
            cursorStyle: "block",
            fontSize: 13,
            fontFamily: "'IBM Plex Mono', 'Fira Code', 'Cascadia Mono', Menlo, monospace",
            lineHeight: 1.3,
            letterSpacing: 0,
            theme: {
                background: "#0a0a0a",
                foreground: "#d4d4d4",
                cursor: "#64ffda",
                cursorAccent: "#0a0a0a",
                selectionBackground: "rgba(100, 255, 218, 0.2)",
                black: "#0a0a0a",
                red: "#ff7b72",
                green: "#64ffda",
                yellow: "#d8b15f",
                blue: "#79c0ff",
                magenta: "#d2a8ff",
                cyan: "#64ffda",
                white: "#d4d4d4",
                brightBlack: "#737373",
                brightRed: "#ff7b72",
                brightGreen: "#64ffda",
                brightYellow: "#d8b15f",
                brightBlue: "#79c0ff",
                brightMagenta: "#d2a8ff",
                brightCyan: "#64ffda",
                brightWhite: "#ffffff"
            },
            allowTransparency: true,
            scrollback: 500
        });

        term.loadAddon(fitAddon);
        term.open(container);

        try {
            fitAddon.fit();
        } catch (e) {
            // ignore fit errors
        }

        var page = currentPage();
        if (page === "404.html") {
            cwd = "~/this/path";
            updateTitlebar("~/this/path");
        } else if (page === "about.html") {
            cwd = "~";
            updateTitlebar("~");
        } else if (page.indexOf("blog") !== -1) {
            cwd = "~";
            updateTitlebar("~");
        } else if (page === "rss.html") {
            cwd = "~";
            updateTitlebar("~");
        }

        println(WELCOME_ART);
        println(MOTD);

        term.write(getPrompt());

        var currentLine = "";

        term.onKey(function (e) {
            var ev = e.domEvent;
            var printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

            if (ev.key === "Enter") {
                println("");
                processCommand(currentLine);
                currentLine = "";
                term.write(getPrompt());
            } else if (ev.key === "Backspace") {
                if (currentLine.length > 0) {
                    currentLine = currentLine.slice(0, -1);
                    term.write("\b \b");
                }
            } else if (ev.key === "Tab") {
                ev.preventDefault();
                var completions = getTabCompletions(currentLine);
                if (completions.length === 1) {
                    var parts = currentLine.split(/\s+/);
                    parts[parts.length - 1] = completions[0];
                    var newInput = parts.join(" ");
                    var diff = newInput.length - currentLine.length;
                    currentLine = newInput;
                    term.write(completions[0].slice(parts[parts.length - 1].length - (parts[parts.length - 1].length - diff)) + (parts.length > 1 ? " " : " "));
                    // rewrite: clear current and reprint
                    term.write("\x1b[2K\r" + getPrompt() + currentLine);
                } else if (completions.length > 1) {
                    println("");
                    println("  " + completions.join("  "));
                    term.write(getPrompt() + currentLine);
                }
            } else if (ev.key === "ArrowUp") {
                ev.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    term.write("\x1b[2K\r" + getPrompt() + history[historyIndex]);
                    currentLine = history[historyIndex];
                }
            } else if (ev.key === "ArrowDown") {
                ev.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    term.write("\x1b[2K\r" + getPrompt() + history[historyIndex]);
                    currentLine = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    term.write("\x1b[2K\r" + getPrompt());
                    currentLine = "";
                }
            } else if (ev.ctrlKey && ev.key === "l") {
                ev.preventDefault();
                term.clear();
                term.write(getPrompt());
                currentLine = "";
            } else if (ev.ctrlKey && ev.key === "c") {
                ev.preventDefault();
                println("^C");
                currentLine = "";
                term.write(getPrompt());
            } else if (ev.ctrlKey && ev.key === "u") {
                ev.preventDefault();
                currentLine = "";
                term.write("\x1b[2K\r" + getPrompt());
            } else if (printable) {
                currentLine += e.key;
                term.write(e.key);
            }
        });

        window.addEventListener("resize", function () {
            if (fitAddon) {
                try {
                    fitAddon.fit();
                } catch (e) {}
            }
        });

        term.focus();
    }

    function initSidebarToggle() {
        var toggle = document.querySelector(".sidebar-toggle");
        var sidebar = document.querySelector(".sidebar");
        if (!toggle || !sidebar) return;

        toggle.addEventListener("click", function () {
            sidebar.classList.toggle("sidebar--collapsed");
            var isCollapsed = sidebar.classList.contains("sidebar--collapsed");
            toggle.textContent = isCollapsed ? "\u25C0" : "\u25B6";
            document.body.classList.toggle("body--terminal-collapsed", isCollapsed);
            if (!isCollapsed && fitAddon) {
                setTimeout(function () {
                    try { fitAddon.fit(); } catch (e) {}
                    if (term) term.focus();
                }, 250);
            }
        });
    }

    function initThemeToggle() {
        document.querySelectorAll(".theme-toggle").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var dark = document.getElementById("theme-dark");
                var light = document.getElementById("theme-light");
                if (dark && dark.checked) {
                    light.checked = true;
                } else if (dark) {
                    dark.checked = true;
                }
                var icon = dark && dark.checked ? "\u263E" : "\u2600";
                document.querySelectorAll(".theme-toggle").forEach(function (b) {
                    b.textContent = icon;
                });
                if (term) {
                    if (dark && dark.checked) {
                        term.options.theme = {
                            background: "#0a0a0a",
                            foreground: "#d4d4d4",
                            cursor: "#64ffda",
                            cursorAccent: "#0a0a0a",
                            selectionBackground: "rgba(100, 255, 218, 0.2)",
                            black: "#0a0a0a",
                            red: "#ff7b72",
                            green: "#64ffda",
                            yellow: "#d8b15f",
                            blue: "#79c0ff",
                            magenta: "#d2a8ff",
                            cyan: "#64ffda",
                            white: "#d4d4d4",
                            brightBlack: "#737373",
                            brightRed: "#ff7b72",
                            brightGreen: "#64ffda",
                            brightYellow: "#d8b15f",
                            brightBlue: "#79c0ff",
                            brightMagenta: "#d2a8ff",
                            brightCyan: "#64ffda",
                            brightWhite: "#ffffff"
                        };
                    } else {
                        term.options.theme = {
                            background: "#ffffff",
                            foreground: "#171717",
                            cursor: "#0d9373",
                            cursorAccent: "#ffffff",
                            selectionBackground: "rgba(13, 147, 115, 0.2)",
                            black: "#171717",
                            red: "#ff7b72",
                            green: "#0d9373",
                            yellow: "#875900",
                            blue: "#0969da",
                            magenta: "#8250df",
                            cyan: "#0d9373",
                            white: "#171717",
                            brightBlack: "#666666",
                            brightRed: "#ff7b72",
                            brightGreen: "#0d9373",
                            brightYellow: "#875900",
                            brightBlue: "#0969da",
                            brightMagenta: "#8250df",
                            brightCyan: "#0d9373",
                            brightWhite: "#ffffff"
                        };
                    }
                }
            });
        });
    }

    function init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function () {
                initSidebarToggle();
                initThemeToggle();
                initTerminal();
            });
        } else {
            initSidebarToggle();
            initThemeToggle();
            initTerminal();
        }
    }

    init();
})();
