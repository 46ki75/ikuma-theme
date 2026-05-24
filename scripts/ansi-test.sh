#!/usr/bin/env bash
# Visually verify terminal.ansi* mappings in the active VS Code theme.
# Focuses on foreground usage — that's how 95% of CLI tools paint color.
# Run inside the VS Code integrated terminal:  bash scripts/ansi-test.sh

names=(black red green yellow blue magenta cyan white)

section() {
  printf "\n\e[1m── %s ──\e[0m\n\n" "$1"
}

section "16 ANSI as foreground"
for i in {0..7}; do
  printf "  \e[3${i}m%-9s\e[0m  \e[3${i}mThe quick brown fox\e[0m\n" "${names[$i]}"
done
echo
for i in {0..7}; do
  printf "  \e[9${i}mbright %-9s\e[0m  \e[9${i}mThe quick brown fox\e[0m\n" "${names[$i]}"
done

section "Log levels (typical CLI convention)"
printf "  \e[90m[2026-05-25 09:14:02]\e[0m \e[34mINFO \e[0m  starting server on port 3000\n"
printf "  \e[90m[2026-05-25 09:14:03]\e[0m \e[36mDEBUG\e[0m  loaded config from .env\n"
printf "  \e[90m[2026-05-25 09:14:04]\e[0m \e[32mOK   \e[0m  database connected (12ms)\n"
printf "  \e[90m[2026-05-25 09:14:05]\e[0m \e[33mWARN \e[0m  cache miss for key 'session:abc'\n"
printf "  \e[90m[2026-05-25 09:14:06]\e[0m \e[31mERROR\e[0m  ECONNREFUSED upstream:5432\n"
printf "  \e[90m[2026-05-25 09:14:07]\e[0m \e[91mFATAL\e[0m  unrecoverable: shutting down\n"

section "Test runner output"
printf "  \e[32m\xe2\x9c\x93\e[0m parses empty input         \e[90m(2 ms)\e[0m\n"
printf "  \e[32m\xe2\x9c\x93\e[0m handles unicode boundaries \e[90m(7 ms)\e[0m\n"
printf "  \e[31m\xe2\x9c\x97\e[0m rejects malformed payload  \e[90m(15 ms)\e[0m\n"
printf "    \e[31mAssertionError:\e[0m expected \e[32m'ok'\e[0m to equal \e[31m'fail'\e[0m\n"
printf "  \e[33m\xe2\x97\x8b\e[0m skipped: requires network  \e[90m(0 ms)\e[0m\n"
printf "\n  \e[32m12 passed\e[0m, \e[31m1 failed\e[0m, \e[33m1 skipped\e[0m  \e[90m(48 ms)\e[0m\n"

section "git diff"
printf "  \e[33mcommit f00ba12 (HEAD -> main)\e[0m\n"
printf "  Author: you <you@example.com>\n\n"
printf "  \e[1mdiff --git a/foo.ts b/foo.ts\e[0m\n"
printf "  \e[36m@@ -1,5 +1,5 @@\e[0m\n"
printf "   import { readFile } from \"node:fs/promises\";\n"
printf "  \e[31m- const old = JSON.parse(await readFile(p, \"utf8\"));\e[0m\n"
printf "  \e[32m+ const fresh = JSON.parse(await readFile(p, \"utf8\"));\e[0m\n"
printf "  \e[91m- /* moved away */\e[0m\n"
printf "  \e[92m+ /* moved here  */\e[0m\n"

section "ls --color"
printf "  \e[01;34msrc\e[0m              \e[01;34mnode_modules\e[0m   "
printf "\e[01;32mbuild.sh\e[0m\n"
printf "  \e[01;36mlatest -> v3\e[0m     README.md      "
printf "\e[01;31marchive.tar.gz\e[0m\n"
printf "  \e[01;35mlogo.png\e[0m         package.json   "
printf "\e[33m.env\e[0m\n"

section "Shell prompt examples"
printf "  \e[32m\xe2\x9e\x9c\e[0m  \e[36m~/projects/repo\e[0m \e[35mgit:(\e[31mmain\e[35m)\e[0m \e[33m\xe2\x9c\x97\e[0m \n"
printf "  \e[94muser@host\e[0m:\e[96m~/dev\e[0m\$ "
printf "\e[90m# previous: exit \e[31m1\e[90m in \e[33m0.4s\e[0m\n"

section "Build tool output (cargo / npm style)"
printf "  \e[1;32m   Compiling\e[0m serde v1.0.193\n"
printf "  \e[1;32m   Compiling\e[0m tokio v1.35.1\n"
printf "  \e[1;32m    Finished\e[0m dev [unoptimized + debuginfo] in 4.21s\n"
printf "  \e[1;33mwarning\e[0m: unused variable: \`x\`\n"
printf "  \e[1;31merror[E0308]\e[0m: mismatched types\n"
printf "    \e[1;34m-->\e[0m src/main.rs:12:9\n"

section "Markdown-ish rich text"
printf "  \e[1;35m# Heading 1\e[0m\n"
printf "  \e[1mbold\e[0m, \e[3mitalic\e[0m, \e[4munderline\e[0m, \e[9mstrikethrough\e[0m, \e[2mdim\e[0m\n"
printf "  link: \e[4;34mhttps://example.com\e[0m\n"
printf "  inline \e[7m code \e[0m  blockquote: \e[90m> a quoted line\e[0m\n"

echo
