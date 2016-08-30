const MATCH_LAST_SEMICOLON_REGEX = /;\s*$/;

export function codeToCustomMetadata(code) {
  try {
    return JSON.parse(code.replace(MATCH_LAST_SEMICOLON_REGEX, ''));
  } catch (err) {
    return {
      err: err.toString(),
    };
  }
};
