_.extend(Backbone.Validation.patterns, {
  lettersOnly: /^[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z]+$/,
  eventNameRegEx: /^[a-zA-Z0-9\-\/\ .+]*$/,
  resourceNameRegEx: /^[a-zA-Z0-9\-\/\ .]*$/,
  fullNameRegEx: /^[а-яА-Яa-zA-Z \-]*$/,
  lettersNumbersRegEx:  /^[a-zA-Z0-9 \-]*$/,
  locationRegEx: /^[a-zA-Z \-]*$/
});