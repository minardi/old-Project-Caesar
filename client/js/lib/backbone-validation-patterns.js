_.extend(Backbone.Validation.patterns, {
  lettersOnly: /^[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z]+$/,
  eventNameRegEx: /^[а-яА-Яa-zA-Z0-9\-\/\ .+]*$/,
  resourceNameRegEx: /^[а-яА-Яa-zA-Z0-9\-\/\ .]*$/,
  fullNameRegEx: /^[а-яА-Яa-zA-Z \-]*$/
});