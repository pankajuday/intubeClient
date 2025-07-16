## Comprehensive Regex Notes

These notes cover the core concepts, syntax, and advanced techniques of Regular Expressions (Regex) in a way that aids learning and future reference.

---

### 1. What is Regex?

* **Definition:** A Regex (Regular Expression) is a sequence of characters that defines a search pattern for matching text.
* **Use Cases:**

  * **Validation:** Emails, phone numbers, passwords
  * **Search & Extraction:** Find substrings, parse logs
  * **Replacement & Transformation:** Reformatting text, sanitization

---

### 2. Basic Components

#### 2.1 Literals

* Plain characters match themselves. E.g., `a` matches "a".

#### 2.2 Metacharacters

| Symbol | Meaning                        |                  |
| ------ | ------------------------------ | ---------------- |
| `.`    | Any character except newline   |                  |
| `^`    | Start of string anchor         |                  |
| `$`    | End of string anchor           |                  |
| `*`    | 0 or more of preceding element |                  |
| `+`    | 1 or more of preceding element |                  |
| `?`    | 0 or 1 of preceding element    |                  |
| \`     | \`                             | Alternation (OR) |
| `()`   | Capturing group                |                  |
| `[]`   | Character class                |                  |
| `\`    | Escape next character          |                  |

---

### 3. Anchors: `^` and `$`

* **`^`:** Matches start of string. Ensures pattern begins at first character.
* **`$`:** Matches end of string. Ensures pattern ends at last character.
* **Combined:** `^pattern$` enforces exact full-string match.

```regex
^Hello$    # matches exactly "Hello" only
```

---

### 4. Character Classes

#### 4.1 Custom Classes: `[ ]`

* `[abc]` matches `a`, `b`, or `c`.
* Ranges: `[A-Z]`, `[a-z]`, `[0-9]`.
* Negation: `[^0-9]` matches any non-digit.

#### 4.2 Predefined Shorthands

| Shorthand | Equivalent      | Matches        |
| --------- | --------------- | -------------- |
| `\d`      | `[0-9]`         | Any digit      |
| `\D`      | `[^0-9]`        | Non-digit      |
| `\w`      | `[A-Za-z0-9_]`  | Word char      |
| `\W`      | `[^A-Za-z0-9_]` | Non-word char  |
| `\s`      | `[ \t\n\r]`     | Whitespace     |
| `\S`      | `[^ \t\n\r]`    | Non-whitespace |

---

### 5. Quantifiers

* **`*`**: Zero or more.  `a*` matches `""`, `"a"`, `"aaaa"`.
* **`+`**: One or more.   `a+` matches `"a"`, `"aaa"`.
* **`?`**: Zero or one.   `a?` matches `""`, `"a"`.
* **`{n}`**: Exactly n.   `a{3}` matches `"aaa"`.
* **`{n,}`**: n or more.  `a{2,}` matches `"aa"`, `"aaaa"`.
* **`{n,m}`**: Between n and m. `a{2,4}` matches `"aa"`, `"aaa"`, `"aaaa"`.

**Greedy vs. Lazy:**

* Greedy quantifiers (`*`, `+`, `{n,}`) match as much as possible.
* Lazy (non-greedy) with `?` after: `*?`, `+?`, `{n,}?` match as little as possible.

---

### 6. Grouping & Capturing

* **Capturing group `( )`:** Saves matched text for backreferences `\1`, `\2`, ...
* **Non-capturing `(?: )`:** Groups without capturing. Cleaner, faster when no backreference needed.

```regex
^(\w+)@(\w+\.\w+)$   # 1st and 2nd capture: local and domain
^(?:\w+)@(?:\w+\.\w+)$ # same match, no captures
```

---

### 7. Lookaround Assertions

#### 7.1 Positive Lookahead `(?=...)`

* Ensures pattern ahead without consuming.
* `(?=.*[A-Z])` ensures at least one uppercase letter somewhere.

#### 7.2 Negative Lookahead `(?!...)`

* Asserts pattern does *not* occur ahead.
* `(?!.*\s)` ensures no whitespace in the string.

#### 7.3 Lookbehinds `(?<=...)` and `(?<!...)` *(Less supported in JS)*

* Assert behind current match.

---

### 8. Common Examples

| Purpose           | Pattern                                                               |                   |                             |            |                     |
| ----------------- | --------------------------------------------------------------------- | ----------------- | --------------------------- | ---------- | ------------------- |
| Email Validation  | `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`                    |                   |                             |            |                     |
| Password Strength | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,20}$` |                   |                             |            |                     |
| URL               | `^https?://[\w.-]+(?:\.[\w.-]+)+[/#?]?.*$`                            |                   |                             |            |                     |
| Date (YYYY-MM-DD) | \`^\d{4}-(0\[1-9]                                                     | 1\[0-2])-(0\[1-9] | \[12]\d                     | 3\[01])$\` |                     |
| IPv4 Address      | \`^(?:25\[0-5]                                                        | 2\[0-4]\d         | \[01]?\d?\d)(?:.(?:25\[0-5] | 2\[0-4]\d  | \[01]?\d?\d)){3}$\` |

---

### 9. Best Practices

* **Use Anchors** (`^`, `$`) to avoid partial matches.
* **Escape Metacharacters** (`.`, `+`, `*`, `?`, `|`, `(`, `)`, `[`, `]`, `{`, `}`, `\\`).
* **Prefer Non-capturing Groups** `(?: )` when you don't need backreferences.
* **Comment Complex Regex** (in engines that support `x` flag) with whitespace and comments.

```regex
# JavaScript (no x-flag) -> use `verboseRegex` in docs.
```

---

### 10. Tools & Resources

* **Online Testers:** [regex101.com](https://regex101.com/), [regexr.com](https://regexr.com/)
* **Cheatsheets:** MDN Web Docs, RegexLib, Regular-Expressions.info
* **Books:** *Mastering Regular Expressions* by Jeffrey Friedl
* **Practice:** Build small patterns daily for names, dates, logs, config files

---

> *Keep experimenting! Regex is powerful but takes practice to master. Refer back to these notes whenever you tackle new text-processing challenges.*
