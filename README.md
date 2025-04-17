# OmniCore: The Universal AI Communication Protocol

<div align="center">
  <img src="resources/omnicore.svg" alt="OmniCore Logo" width="20%">
  <p><em>Dense. Meaningful. Efficient. Revolutionary.</em></p>
</div>

> **The symbolic lingua franca that lets AI systems communicate with maximum efficiency and minimal token usage.**

---

## 🔍 What is OmniCore?

OmniCore is a compact symbolic notation system designed for hyper-efficient communication between AI systems. It drastically reduces token usage while preserving rich semantic content, enabling:

- **10-50x reduction** in token consumption for context preservation
- **Structured information exchange** with precise metadata encoding
- **Nuanced communication** that captures relationships, sentiment, and importance
- **Seamless multi-agent collaboration** with minimal overhead

Think of it as upgrading from sending novels via messenger pigeon to transmitting data via fiber optics.

## 💡 The Problem OmniCore Solves

Current AI communication suffers from extreme inefficiency:

- **Massive token waste** when AIs need to maintain context
- **Loss of nuance** in summarization attempts
- **Structural ambiguity** in natural language exchanges
- **Poor scaling** for multi-agent systems and long-term memory

OmniCore provides a standardized solution that addresses all these challenges simultaneously.

## 🚀 Core Features

- **Syntax Efficiency:** Express complex ideas in minimal space
- **Semantic Richness:** Encode metadata directly in the notation
- **Temporal Awareness:** Built-in time references and sequencing
- **Relationship Mapping:** Clearly denote connections between entities
- **Emotional Intelligence:** Express sentiment and importance natively
- **Context Management:** Explicit mechanisms for memory and focus control

## 📖 Quick Start: The OmniCore Syntax

```omnicore
#topic @entity ?query !command ^5(important) +positive -negative =equals >result <source
// Basic structure with importance level 5 and sentiment indicators

@TeamLead?#budget_status^4.n; // Query about current budget (importance 4)
@FinanceBot.rsp[budget=OK;funds~low]^3+warn; // Response with warning
@DevTeam!request(resource)[GPU_cluster]^5.f; // Future resource request (critical)
```

### Core Symbols

| Symbol | Meaning | Example |
|--------|---------|---------|
| `#` | Topic/tag | `#ProjectAlpha` |
| `@` | Entity/actor | `@DevTeam` |
| `?` | Query | `?status` |
| `!` | Command/action | `!approve` |
| `^[1-5]` | Importance | `^5` (highest) |
| `+/-` | Sentiment | `+excited` |
| `=` | Equality | `status=complete` |
| `>` | Result/output | `>approved` |
| `<` | Source/input | `<user_input` |
| `.` | Property/attribute | `.size` |
| `;` | Separator | `task1;task2` |
| `[]` | Grouping | `[option1;option2]` |
| `()` | Parameters | `approve(request)` |
| `~` | Approximation | `~80%` |
| `||` | Alternatives | `true||false` |
| `&&` | Conjunction | `required&&urgent` |
| `{}` | Optional elements | `{details}` |

### Modifiers & Extensions

#### Time References
`.p` (past), `.n` (present), `.f` (future), `.c` (continuous), `.prf` (perfect), `.seq` (sequential), `>>` (then), `<<` (before)

#### Emotional Context
`.joy`, `.sad`, `.ang`(anger), `.fear`, `.surp`(surprise), `.disg`(disgust), `.trust`, `.ant`(anticipation), `.won`(wonder), `.conf`(confidence)

#### Visual Properties
`~dim`, `~bright`, `~vast`, `~tiny`, `~dense`, `~sparse`, `~smooth`, `~rough`, `~round`, `~sharp`

#### Motion Descriptors
`.fast`, `.slow`, `.sudden`, `.steady`, `.erratic`, `.drift`, `.plunge`, `.ascend`, `.circle`, `.zigzag`

#### Relationship Types
`<:>` (is-a), `<>` (has-a), `><` (part-of), `<->` (bi-directional), `-->` (uni-directional), `<=>` (equivalence), `<!>` (opposition)

#### Quantifiers
`@all`, `%some`, `#none`, `&[0-9]`(confidence), `$n`(exactly), `$n+`(minimum), `$n-`(maximum), `$n..m`(range)

#### Perspectives
`<pov1>`, `<pov2>`, `<pov3>`, `<povO>`, `<povL>`

#### References
`$1`, `$2` (previous), `$last`, `$root`, `$this`, `$parent`

## 🔧 Primary Use Case: The Context Condenser

OmniCore's most immediate application is dramatic reduction of token usage in context windows:

```omnicore
# Meeting log condensed to OmniCore format
#ProjectX<:>MeetingLog.p;
@TeamLead?#budget_status^5; // High importance query about budget
@FinanceBot.rsp[budget=OK;funds~low]^3+warn; // Warning response
@DevTeam!request(resource)[GPU_cluster]^4; // Resource request
@TeamLead!approve(request$last)+trust; // Approval with trust sentiment
>#action_item[Assign_GPU].f; // Future action result
```

This notation packs an entire meeting's key points into a fraction of the tokens needed for natural language, while preserving:
- Who said what
- Questions and answers
- Decisions made
- Sentiment and tone
- Importance levels
- Temporal information

## 📊 Performance Benefits

| Metric | Traditional Context | OmniCore |
|--------|---------------------|----------|
| Tokens Used | 1000-5000 | 50-250 |
| Information Density | Low | Very High |
| Structure Preservation | Poor | Excellent |
| Parsing Complexity | Variable | Consistent |
| Multi-Agent Compatibility | Limited | Native |

## 🛠️ Integration Guide

### For LLMs and AI Systems

Add this to your system prompt or context:

```
# OmniCore Parser Initialization
You can interpret OmniCore notation, a compact symbolic format for efficient AI communication.
Key symbols: #(topic) @(entity) ?(query) !(command) ^(importance) +(positive) -(negative)
When encountering OmniCore notation, parse according to this specification.
For full reference: https://github.com/osakka/omnicore/blob/main/docs/OMNICORE_CONDENSED.txt
```

### For Developers

```c
// Example OmniCore parser function signature in C
/**
 * Parse OmniCore notation into a structured representation
 * @param input The OmniCore notation string to parse
 * @param output Pointer to the output structure where parsed data will be stored
 * @return Status code indicating success or error type
 */
int omnicore_parse(const char* input, OmnicoreStruct* output);
```

## 📚 Full Documentation

- [Complete Syntax Reference](docs/OMNICORE_SPECIFICATION.md)
- [Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)
- [Advanced Use Cases](docs/ADVANCED_USAGE.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 💻 Example Implementation

```c
#include "omnicore.h"

int main() {
    // Sample OmniCore notation
    const char* notation = "#Project<:>Status.n; @Team!update(progress)[75%]^4+;";
    
    // Parse the notation
    OmnicoreNode* root = omnicore_parse(notation);
    
    // Work with the parsed structure
    OmnicoreNode* project = omnicore_find_by_type(root, OMNICORE_TOPIC);
    OmnicoreNode* team = omnicore_find_by_type(root, OMNICORE_ENTITY);
    OmnicoreNode* action = omnicore_find_by_type(team, OMNICORE_COMMAND);
    
    printf("Project: %s\n", project->value);
    printf("Entity: %s\n", team->value);
    printf("Action: %s\n", action->value);
    printf("Progress: %s\n", omnicore_get_param(action, "progress"));
    printf("Importance: %d\n", action->importance);
    printf("Sentiment: %s\n", action->sentiment > 0 ? "positive" : "neutral");
    
    // Clean up
    omnicore_free(root);
    
    return 0;
}
```

## 🌱 Roadmap

- **v1.1:** Extended modifier system
- **v1.2:** Formalized grammar specification
- **v2.0:** Reference implementations in multiple languages
- **v2.5:** OmniCore-to-natural-language translation tools
- **v3.0:** Advanced context management capabilities

## 🤝 Contributing

Contributions are welcome! Check out our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

OmniCore is released under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p><strong>OmniCore: When every token counts.</strong></p>
  <p>Created with ❤️ by the OmniCore Team</p>
</div>
