/**
 * Project Apricot
 * Copyright (c) 2015 daiz, mathharachan, risingsun_33178.
 */

/* html-* API */
apricot.Html = {};

/* common */
apricot.Html.Height = function(v, id) {
  apricot.setStyle([
    {"height": apricot.toPx(v)}
  ], id);
};
apricot.Html.BackgroundColor = function(v, id) {
  apricot.setStyle([
    {"background-color": v}
  ], id);
}

apricot.Html.Img = {
  "LocalFile": function(src, id) {
    apricot.setAttr('src', src, id);
  }
};

apricot.Html.Button = {

};

apricot.Html.Input = {
  "Placeholder": function(v, id) {
    apricot.setAttr('placeholder', v, id);
  },
  "Height": apricot.Html.Height
}
