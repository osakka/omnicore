# OmniCore v1.0 Specification

This document provides the formal specification for OmniCore v1.0, based on NexusScript v1.3.

## 1. Core Symbols

| Symbol | Name          | Description                                      | Example                          |
| :----- | :------------ | :----------------------------------------------- | :------------------------------- |
| `#`    | Topic         | Defines the main subject                         | `#weather`                       |
| `@`    | Context/Entity| Specifies the entity or context involved         | `@user`                          |
| `?`    | Query         | Indicates a question or request for information  | `?temperature`                   |
| `!`    | Command       | Indicates an instruction or action               | `!update(status)`                |
| `^`    | Importance    | Sets importance level (1-5, 5=highest)           | `^4`                             |
| `+`    | Positive      | Marks positive sentiment or affirmation        | `+ok`                            |
| `-`    | Negative      | Marks negative sentiment or negation           | `-error`                         |
| `=`    | Equals        | Assigns a value or indicates equality            | `temp=75F`                       |
| `>`    | Result        | Shows the outcome or result of an action       | `>success`                       |
| `<`    | Source        | Indicates the origin of information or action    | `<sensorA`                       |
| `.`    | Property      | Accesses a property or attribute of an entity  | `@user.name`                     |
| `;`    | Separator     | Separates distinct statements or clauses         | `#A; #B`                         |
| `[]`   | Group/Args    | Groups elements or holds arguments/details     | `!cmd[arg1&arg2]`                |
| `()`   | Parameters    | Encloses parameters for functions or commands    | `!fnc(param1)`                   |
| `~`    | Approximate   | Denotes approximation or quality (visual etc.) | `~10km`, `~bright`             |
| `\|\|` | Alternatives  | Logical OR                                       | `red||blue`                      |
| `&&`   | Conjunction   | Logical AND                                      | `warm&&sunny`                    |
| `{}`   | Optional/Spec | Holds optional elements or specific details    | `!config{mode:auto}`             |

## 2. Abbreviations (Common)

* `usr`: user
* `sys`: system
* `ctx`: context
* `inf`: information
* `qry`: query
* `rsp`: response
* `cmd`: command
* `arg`: argument
* `obj`: object
* `fnc`: function
* `def`: definition
* `ref`: reference
* `val`: value
* `var`: variable
* `op`: operation
* `cnd`: condition
* `rel`: relation
* `attr`: attribute
* `doc`: documentation
* `mem`: memory

## 3. Modifiers

### 3.1 Time

* `.p`: Past
* `.n`: Present (default if unspecified)
* `.f`: Future
* `.c`: Continuous
* `.prf`: Perfect tense
* `.seq`: Sequential
* `>>`: Then (Sequential consequence)
* `<<`: Before (Sequential prerequisite)
* Example: `@event.p; >>@consequence.n`

### 3.2 Emotion

* `.joy`, `.sad`, `.ang`(anger), `.fear`, `.surp`(surprise), `.disg`(disgust), `.trust`, `.ant`(anticipation), `.won`(wonder), `.conf`(confusion)
* Example: `@usr+trust^3`

### 3.3 Visual

* `~dim`, `~bright`, `~vast`, `~tiny`, `~dense`, `~sparse`, `~smooth`, `~rough`, `~round`, `~sharp`
* Example: `#object~round~smooth`

### 3.4 Motion

* `.fast`, `.slow`, `.sudden`, `.steady`, `.erratic`, `.drift`, `.plunge`, `.ascend`, `.circle`, `.zigzag`
* Example: `@vehicle.move.fast`

### 3.5 Relationships

* `<:>`: Is-A (Inheritance)
* `<>`: Has-A (Composition)
* `><`: Part-Of
* `<->`: Bidirectional Relationship
* `-->`: Unidirectional Relationship
* `<=>`: Equivalence
* `<!>`: Opposing Relationship/Conflict
* Example: `@cat<:>animal; @car<>engine`

### 3.6 Quantity

* `@all`: All
* `%some`: Some
* `#none`: None
* `&[0-9]`: Confidence score (0-9)
* `$n`: Exactly n
* `$n+`: Minimum n
* `$n-`: Maximum n
* `$n..m`: Range n to m
* Example: `%items~red^2; $5+units`

### 3.7 Perspective

* `<pov1>`: First-person
* `<pov2>`: Second-person
* `<pov3>`: Third-person
* `<povO>`: Omniscient
* `<povL>`: Limited
* Example: `<pov3>#story`

## 4. Advanced Features

### 4.1 Cross-References

* `$1`, `$2`: Refer to previous statements (1st, 2nd)
* `$last`: Refer to the immediately preceding statement
* `$root`: Refer to the main/root topic
* `$this`: Refer to the current entity/context
* `$parent`: Refer to the parent context
* Example: `@A; @B<ref($last)`

### 4.2 Functions

* `!fnc(arg1, arg2)`: Call function with arguments.
* `!fnc()`: Call function with no arguments.
* `!fnc(arg1[subarg])`: Call function with complex arguments.
* Example: `!calculate(distance[@A,@B])`

### 4.3 Disambiguation

* `$abbr[full_name]`: Expand abbreviation.
* `#topic{subtopic}`: Specify subtopic.
* `` `exact phrase` ``: Treat enclosed text literally.
* Example: `$sys[SystemA]; #config{network}; \`User Input\` `

### 4.4 Context Management

* `!ctx#[topic]:retain^[1-5]`: Set topic context, optionally retain previous context with importance.
* `!ctx-clear`: Clear current context stack.
* `!ctx-save[name]`: Save current context state.
* `!ctx-load[name]`: Restore saved context state.
* `!focus#[topic]`: Switch focus within current context.
* `!zoom+/-`: Adjust level of detail.
* `!scope+/-`: Adjust breadth of context.

## 5. Parsing Order (Recommended)

1.  Special Characters (`#@?!^+=><.;[]()...`)
2.  Abbreviations (`usr`, `sys`, etc.)
3.  Structure (Identify clauses, groups, parameters)
4.  Cross-References (`$last`, `$1`, etc.)
5.  Functions (`!fnc()`)
6.  Modifiers (`.time`, `+emotion`, `~visual`, etc.)
7.  Transformations/Interpretation

## 6. File Extension

Recommended file extension: `.omnicore`
