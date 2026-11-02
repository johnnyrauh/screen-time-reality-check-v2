// Single source of truth for the Claude model. Override with ANTHROPIC_MODEL.
export const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
