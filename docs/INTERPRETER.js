/**
 * OmniCore Interpreter
 * 
 * A lightweight JavaScript implementation of an OmniCore parser and generator.
 * This reference implementation demonstrates how to parse OmniCore syntax
 * and generate natural language from its symbolic representation.
 */

class OmniCoreInterpreter {
  constructor() {
    // Symbol tables
    this.symbols = {
      special: {
        '#': 'topic',
        '@': 'entity',
        '?': 'query',
        '!': 'command',
        '^': 'importance',
        '+': 'positive',
        '-': 'negative',
        '=': 'equals',
        '>': 'result',
        '<': 'source',
        '.': 'property',
        ':': 'elaboration',
        ';': 'separator',
        '[': 'group_start',
        ']': 'group_end',
        '(': 'param_start',
        ')': 'param_end',
        '~': 'approximate',
        '|': 'alternative',
        '&': 'conjunction',
        '{': 'optional_start',
        '}': 'optional_end',
        '*': 'emphasis'
      },
      temporal: {
        'p': 'past',
        'n': 'present',
        'f': 'future',
        'c': 'continuous',
        'prf': 'perfect',
        'seq': 'sequential'
      },
      emotion: {
        'joy': 'joy',
        'sad': 'sadness',
        'ang': 'anger',
        'fear': 'fear',
        'surp': 'surprise',
        'disg': 'disgust',
        'trust': 'trust',
        'ant': 'anticipation',
        'won': 'wonder',
        'conf': 'confusion'
      },
      visual: {
        'dim': 'dim',
        'bright': 'bright',
        'vast': 'vast',
        'tiny': 'tiny',
        'dense': 'dense',
        'sparse': 'sparse',
        'smooth': 'smooth',
        'rough': 'rough',
        'round': 'round',
        'sharp': 'sharp'
      },
      motion: {
        'fast': 'fast',
        'slow': 'slow',
        'sudden': 'sudden',
        'steady': 'steady',
        'erratic': 'erratic',
        'drift': 'drifting',
        'plunge': 'plunging',
        'ascend': 'ascending',
        'circle': 'circular',
        'zigzag': 'zigzagging'
      },
      relationship: {
        '<:>': 'is a',
        '<>': 'has',
        '><': 'is part of',
        '<->': 'relates bidirectionally with',
        '-->': 'leads to',
        '<=>': 'equals',
        '<!>': 'opposes'
      },
      perspective: {
        'pov1': 'first-person perspective',
        'pov2': 'second-person perspective',
        'pov3': 'third-person perspective',
        'povO': 'omniscient perspective',
        'povL': 'limited perspective'
      }
    };
    
    // Common abbreviations
    this.abbreviations = {
      'usr': 'user',
      'sys': 'system',
      'ctx': 'context',
      'inf': 'information',
      'qry': 'query',
      'rsp': 'response',
      'cmd': 'command',
      'arg': 'argument',
      'obj': 'object',
      'fnc': 'function',
      'def': 'definition',
      'ref': 'reference',
      'val': 'value',
      'var': 'variable',
      'op': 'operation',
      'cnd': 'condition',
      'rel': 'relation',
      'attr': 'attribute',
      'doc': 'documentation',
      'mem': 'memory'
    };
  }

  /**
   * Tokenize OmniCore input
   * @param {string} input - OmniCore expression
   * @returns {Array} - Array of tokens
   */
  tokenize(input) {
    const tokens = [];
    let position = 0;
    
    while (position < input.length) {
      // Skip whitespace
      if (/\s/.test(input[position])) {
        position++;
        continue;
      }
      
      // Check for special characters
      if (this.symbols.special[input[position]]) {
        tokens.push({
          type: this.symbols.special[input[position]],
          value: input[position],
          position
        });
        position++;
        continue;
      }
      
      // Check for perspective markers <pov*>
      if (input[position] === '<' && 
          position + 5 <= input.length && 
          input.substring(position, position + 4) === '<pov') {
        
        const endPos = input.indexOf('>', position);
        if (endPos !== -1) {
          const marker = input.substring(position + 1, endPos);
          if (this.symbols.perspective[marker]) {
            tokens.push({
              type: 'perspective',
              value: marker,
              position
            });
            position = endPos + 1;
            continue;
          }
        }
      }
      
      // Check for relationship symbols
      for (const rel in this.symbols.relationship) {
        if (input.substr(position, rel.length) === rel) {
          tokens.push({
            type: 'relationship',
            value: rel,
            position
          });
          position += rel.length;
          continue;
        }
      }
      
      // Extract text/identifiers
      if (/[a-zA-Z0-9_-]/.test(input[position])) {
        let value = '';
        const startPosition = position;
        
        while (position < input.length && 
               /[a-zA-Z0-9_\-.]/.test(input[position]) && 
               !this.symbols.special[input[position]]) {
          value += input[position];
          position++;
        }
        
        // Check for property modifiers
        if (value.includes('.')) {
          const [base, modifier] = value.split('.');
          
          // Check if the modifier is a temporal, emotional, or motion marker
          if (this.symbols.temporal[modifier]) {
            tokens.push({
              type: 'text',
              value: base,
              position: startPosition
            });
            tokens.push({
              type: 'temporal',
              value: modifier,
              position: startPosition + base.length + 1
            });
          } else if (this.symbols.emotion[modifier]) {
            tokens.push({
              type: 'text',
              value: base,
              position: startPosition
            });
            tokens.push({
              type: 'emotion',
              value: modifier,
              position: startPosition + base.length + 1
            });
          } else if (this.symbols.motion[modifier]) {
            tokens.push({
              type: 'text',
              value: base,
              position: startPosition
            });
            tokens.push({
              type: 'motion',
              value: modifier,
              position: startPosition + base.length + 1
            });
          } else {
            tokens.push({
              type: 'text',
              value,
              position: startPosition
            });
          }
        } else {
          tokens.push({
            type: 'text',
            value,
            position: startPosition
          });
        }
        
        continue;
      }
      
      // Skip unknown characters
      position++;
    }
    
    return tokens;
  }

  /**
   * Parse OmniCore tokens into an abstract syntax tree
   * @param {Array} tokens - Array of tokens
   * @returns {Object} - AST
   */
  parse(tokens) {
    let position = 0;
    const ast = {
      type: 'root',
      children: []
    };
    
    // Parse statements separated by ;
    while (position < tokens.length) {
      const statement = this.parseStatement(tokens, position);
      if (statement) {
        ast.children.push(statement.node);
        position = statement.position;
      } else {
        position++;
      }
      
      // Skip separator
      if (position < tokens.length && tokens[position].type === 'separator') {
        position++;
      }
    }
    
    return ast;
  }
  
  /**
   * Parse a single statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Statement node and new position
   */
  parseStatement(tokens, position) {
    if (position >= tokens.length) {
      return null;
    }
    
    // Check statement type based on first token
    switch (tokens[position].type) {
      case 'perspective':
        return this.parsePerspective(tokens, position);
        
      case 'topic':
        return this.parseTopic(tokens, position);
        
      case 'entity':
        return this.parseEntity(tokens, position);
        
      case 'query':
        return this.parseQuery(tokens, position);
        
      case 'command':
        return this.parseCommand(tokens, position);
        
      default:
        // Skip unknown tokens
        return { node: null, position: position + 1 };
    }
  }
  
  /**
   * Parse a perspective statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Perspective node and new position
   */
  parsePerspective(tokens, position) {
    const perspectiveToken = tokens[position];
    const node = {
      type: 'perspective',
      value: perspectiveToken.value,
      children: []
    };
    
    position++;
    
    // Parse the statement that follows the perspective
    if (position < tokens.length) {
      const statement = this.parseStatement(tokens, position);
      if (statement && statement.node) {
        node.children.push(statement.node);
        position = statement.position;
      }
    }
    
    return { node, position };
  }
  
  /**
   * Parse a topic statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Topic node and new position
   */
  parseTopic(tokens, position) {
    position++; // Skip # token
    
    const node = {
      type: 'topic',
      value: '',
      modifiers: [],
      children: []
    };
    
    // Get topic name
    if (position < tokens.length && tokens[position].type === 'text') {
      node.value = tokens[position].value;
      position++;
    }
    
    // Parse modifiers and properties
    position = this.parseModifiers(tokens, position, node);
    
    return { node, position };
  }
  
  /**
   * Parse an entity statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Entity node and new position
   */
  parseEntity(tokens, position) {
    position++; // Skip @ token
    
    const node = {
      type: 'entity',
      value: '',
      modifiers: [],
      children: []
    };
    
    // Get entity name
    if (position < tokens.length && tokens[position].type === 'text') {
      node.value = tokens[position].value;
      position++;
    }
    
    // Parse modifiers and properties
    position = this.parseModifiers(tokens, position, node);
    
    return { node, position };
  }
  
  /**
   * Parse a query statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Query node and new position
   */
  parseQuery(tokens, position) {
    position++; // Skip ? token
    
    const node = {
      type: 'query',
      target: null,
      modifiers: []
    };
    
    // Check for topic specifier
    if (position < tokens.length && tokens[position].type === 'topic') {
      const topicResult = this.parseTopic(tokens, position);
      node.target = topicResult.node;
      position = topicResult.position;
    }
    
    // Parse modifiers
    position = this.parseModifiers(tokens, position, node);
    
    return { node, position };
  }
  
  /**
   * Parse a command statement
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @returns {Object} - Command node and new position
   */
  parseCommand(tokens, position) {
    position++; // Skip ! token
    
    const node = {
      type: 'command',
      action: '',
      parameters: [],
      modifiers: []
    };
    
    // Get command action
    if (position < tokens.length && tokens[position].type === 'text') {
      node.action = tokens[position].value;
      position++;
    }
    
    // Check for parameters
    if (position < tokens.length && tokens[position].type === 'param_start') {
      position++; // Skip ( token
      
      // Parse parameter content
      const paramStart = position;
      let depth = 1;
      
      while (position < tokens.length && depth > 0) {
        if (tokens[position].type === 'param_start') {
          depth++;
        } else if (tokens[position].type === 'param_end') {
          depth--;
        }
        
        if (depth > 0) {
          position++;
        }
      }
      
      // Extract parameter tokens
      const paramTokens = tokens.slice(paramStart, position);
      if (paramTokens.length > 0) {
        // For simplicity, just join parameter text tokens
        const paramTexts = paramTokens
          .filter(t => t.type === 'text')
          .map(t => t.value);
        
        node.parameters = paramTexts;
      }
      
      if (position < tokens.length && tokens[position].type === 'param_end') {
        position++; // Skip ) token
      }
    }
    
    // Parse modifiers
    position = this.parseModifiers(tokens, position, node);
    
    return { node, position };
  }
  
  /**
   * Parse modifiers (importance, sentiment, etc)
   * @param {Array} tokens - Array of tokens
   * @param {number} position - Current position
   * @param {Object} node - Node to add modifiers to
   * @returns {number} - New position
   */
  parseModifiers(tokens, position, node) {
    while (position < tokens.length) {
      // Check for end of statement
      if (tokens[position].type === 'separator') {
        break;
      }
      
      // Parse importance
      if (tokens[position].type === 'importance') {
        position++; // Skip ^ token
        
        if (position < tokens.length && tokens[position].type === 'text') {
          node.modifiers.push({
            type: 'importance',
            value: tokens[position].value
          });
          position++;
        }
        continue;
      }
      
      // Parse sentiment
      if (tokens[position].type === 'positive') {
        node.modifiers.push({ type: 'sentiment', value: 'positive' });
        position++;
        continue;
      }
      
      if (tokens[position].type === 'negative') {
        node.modifiers.push({ type: 'sentiment', value: 'negative' });
        position++;
        continue;
      }
      
      // Parse emphasis
      if (tokens[position].type === 'emphasis') {
        node.modifiers.push({ type: 'emphasis', value: true });
        position++;
        continue;
      }
      
      // Parse temporal, emotion, motion markers that were already tokenized
      if (tokens[position].type === 'temporal') {
        node.modifiers.push({
          type: 'temporal',
          value: tokens[position].value
        });
        position++;
        continue;
      }
      
      if (tokens[position].type === 'emotion') {
        node.modifiers.push({
          type: 'emotion',
          value: tokens[position].value
        });
        position++;
        continue;
      }
      
      if (tokens[position].type === 'motion') {
        node.modifiers.push({
          type: 'motion',
          value: tokens[position].value
        });
        position++;
        continue;
      }
      
      // Parse relationship
      if (tokens[position].type === 'relationship') {
        node.modifiers.push({
          type: 'relationship',
          value: tokens[position].value
        });
        position++;
        continue;
      }
      
      // Parse approximate
      if (tokens[position].type === 'approximate') {
        position++; // Skip ~ token
        
        if (position < tokens.length && tokens[position].type === 'text') {
          node.modifiers.push({
            type: 'approximate',
            value: tokens[position].value
          });
          position++;
        }
        continue;
      }
      
      // Parse result/consequence
      if (tokens[position].type === 'result') {
        position++; // Skip > token
        
        const targetResult = this.parseStatement(tokens, position);
        if (targetResult && targetResult.node) {
          node.modifiers.push({
            type: 'result',
            value: targetResult.node
          });
          position = targetResult.position;
          continue;
        }
      }
      
      // Parse sequence
      if (position < tokens.length - 1 && 
          tokens[position].type === 'result' && 
          tokens[position + 1].type === 'result') {
        position += 2; // Skip >> tokens
        
        const targetResult = this.parseStatement(tokens, position);
        if (targetResult && targetResult.node) {
          node.modifiers.push({
            type: 'sequence',
            value: targetResult.node
          });
          position = targetResult.position;
          continue;
        }
      }
      
      // Parse group
      if (tokens[position].type === 'group_start') {
        position++; // Skip [ token
        
        const groupStart = position;
        let depth = 1;
        
        while (position < tokens.length && depth > 0) {
          if (tokens[position].type === 'group_start') {
            depth++;
          } else if (tokens[position].type === 'group_end') {
            depth--;
          }
          
          if (depth > 0) {
            position++;
          }
        }
        
        // Extract group tokens
        const groupTokens = tokens.slice(groupStart, position);
        if (groupTokens.length > 0) {
          // For simplicity, just join group text tokens
          const groupTexts = groupTokens
            .filter(t => t.type === 'text')
            .map(t => t.value);
          
          node.modifiers.push({
            type: 'group',
            value: groupTexts.join('-')
          });
        }
        
        if (position < tokens.length && tokens[position].type === 'group_end') {
          position++; // Skip ] token
        }
        continue;
      }
      
      // If no modifier matched, move to next token
      position++;
    }
    
    return position;
  }

  /**
   * Generate natural language from OmniCore AST
   * @param {Object} ast - AST generated by parse()
   * @returns {string} - Natural language text
   */
  generate(ast) {
    if (!ast || ast.type !== 'root') {
      return '';
    }
    
    const sentences = ast.children
      .map(node => this.generateStatement(node))
      .filter(Boolean);
    
    return sentences.join('. ');
  }
  
  /**
   * Generate natural language for a statement
   * @param {Object} node - AST node
   * @returns {string} - Natural language text
   */
  generateStatement(node) {
    if (!node) return '';
    
    // Handle perspective nodes
    if (node.type === 'perspective') {
      const perspective = this.symbols.perspective[node.value] || 'unknown perspective';
      const content = node.children.map(child => this.generateStatement(child)).join('. ');
      
      return `From ${perspective}, ${content}`;
    }
    
    // Handle topic nodes
    if (node.type === 'topic') {
      let text = `Regarding ${this.expandAbbreviation(node.value)}`;
      text = this.applyModifiers(text, node.modifiers);
      return text;
    }
    
    // Handle entity nodes
    if (node.type === 'entity') {
      let text = this.expandAbbreviation(node.value);
      text = this.applyModifiers(text, node.modifiers);
      return text;
    }
    
    // Handle query nodes
    if (node.type === 'query') {
      let text = 'A question about';
      if (node.target) {
        text += ` ${this.generateStatement(node.target)}`;
      }
      text = this.applyModifiers(text, node.modifiers);
      return text;
    }
    
    // Handle command nodes
    if (node.type === 'command') {
      let text = `${this.expandAbbreviation(node.action)}`;
      
      if (node.parameters && node.parameters.length > 0) {
        text += ` ${node.parameters.join(', ')}`;
      }
      
      text = this.applyModifiers(text, node.modifiers);
      return text;
    }
    
    return '';
  }
  
  /**
   * Apply modifiers to natural language text
   * @param {string} text - Base text
   * @param {Array} modifiers - Array of modifiers
   * @returns {string} - Modified text
   */
  applyModifiers(text, modifiers) {
    if (!modifiers || modifiers.length === 0) {
      return text;
    }
    
    let result = text;
    const additions = [];
    
    // Process modifiers
    modifiers.forEach(mod => {
      switch (mod.type) {
        case 'importance':
          additions.push(`importance ${mod.value}`);
          break;
          
        case 'sentiment':
          additions.push(mod.value);
          break;
          
        case 'emphasis':
          additions.push('emphasized');
          break;
          
        case 'temporal':
          const tense = this.symbols.temporal[mod.value] || mod.value;
          result = this.applyTense(result, tense);
          break;
          
        case 'emotion':
          const emotion = this.symbols.emotion[mod.value] || mod.value;
          additions.push(`with ${emotion}`);
          break;
          
        case 'motion':
          const motion = this.symbols.motion[mod.value] || mod.value;
          additions.push(motion);
          break;
          
        case 'relationship':
          const relation = this.symbols.relationship[mod.value] || mod.value;
          additions.push(`${relation}`);
          break;
          
        case 'approximate':
          additions.push(`approximately ${mod.value}`);
          break;
          
        case 'group':
          additions.push(`(${mod.value})`);
          break;
          
        case 'result':
          if (typeof mod.value === 'object') {
            additions.push(`resulting in ${this.generateStatement(mod.value)}`);
          } else {
            additions.push(`resulting in ${mod.value}`);
          }
          break;
          
        case 'sequence':
          if (typeof mod.value === 'object') {
            additions.push(`then ${this.generateStatement(mod.value)}`);
          } else {
            additions.push(`then ${mod.value}`);
          }
          break;
      }
    });
    
    // Add modifiers to text
    if (additions.length > 0) {
      result += ` (${additions.join(', ')})`;
    }
    
    return result;
  }
  
  /**
   * Apply tense to text
   * @param {string} text - Base text
   * @param {string} tense - Tense to apply
   * @returns {string} - Text with applied tense
   */
  applyTense(text, tense) {
    // Simple tense application for demonstration
    switch (tense) {
      case 'past':
        return `${text} (in the past)`;
      case 'future':
        return `${text} (in the future)`;
      case 'continuous':
        return `${text} (continuously)`;
      case 'perfect':
        return `${text} (perfectly)`;
      case 'sequential':
        return `${text} (sequentially)`;
      default:
        return text;
    }
  }
  
  /**
   * Expand abbreviation if it exists
   * @param {string} text - Text to check for abbreviations
   * @returns {string} - Expanded text
   */
  expandAbbreviation(text) {
    return this.abbreviations[text] || text;
  }

  /**
   * Parse and generate natural language from OmniCore input
   * @param {string} input - OmniCore expression
   * @returns {string} - Natural language text
   */
  interpret(input) {
    const tokens = this.tokenize(input);
    const ast = this.parse(tokens);
    return this.generate(ast);
  }
}

// Export the interpreter for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OmniCoreInterpreter;
}

// Example usage
if (typeof window !== 'undefined') {
  window.OmniCoreInterpreter = OmniCoreInterpreter;
  
  // Example in browser
  function translateOmniCore() {
    const input = document.getElementById('omnicore-input').value;
    const interpreter = new OmniCoreInterpreter();
    const output = interpreter.interpret(input);
    document.getElementById('natural-output').textContent = output;
  }
}

// Simple CLI example for Node.js
if (typeof process !== 'undefined' && process.argv.length > 2) {
  const input = process.argv[2];
  const interpreter = new OmniCoreInterpreter();
  console.log(interpreter.interpret(input));
}
