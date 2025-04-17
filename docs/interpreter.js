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
    const
