module.exports = {
  getSiteId: getSiteId,
  statusCheck: statusCheck
};

function getSiteId(context, event, done) {
  var allSites = [
    82,
    71,
    84,
    10,
    2,
    12,
    68,
    20,
    26,
    73,
    74,
    75,
    19,
    16,
    6,
    85,
    72,
    22,
    41,
    40,
    37,
    36,
    34,
    32,
    33,
    31,
    30,
    35,
    7,
    25,
    23,
    21,
    24,
    8,
    70,
    27,
    0,
    76,
    77,
    78,
    79,
    80,
    81,
    28,
    83,
    4,
    3,
    29,
    13,
    11,
    14,
    9,
    18,
    39,
    38,
    15,
    5,
    1,
    69
  ];
  var randomIndex = Math.floor(Math.random() * allSites.length);

  context.vars["siteId"] = allSites[randomIndex];

  return done();
}

function statusCheck(requestParams, response, context, ee, next) {
  const greenFg = "\x1b[32m";
  const redBg = "\x1b[41m";
  const resetColour = "\x1b[0m";

  context.vars["status"] =
    response.statusCode === 200
      ? `${greenFg}OK${resetColour}`
      : `${redBg} ${response.statusCode} ${resetColour}`;

  return next();
}
