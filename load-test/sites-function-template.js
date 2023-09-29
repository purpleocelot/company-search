module.exports = {
  getSiteId: getSiteId,
  statusCheck: statusCheck
};

function getSiteId(context, event, done) {
  var allSites = [SITES_PLACEHOLDER];
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
