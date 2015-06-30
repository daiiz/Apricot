apricot.manifest = {
  /* base.png */
  "base": {

    "brick_0": {
      "design": {
        "zIndex": 10,
        "backgroundColor": "#3F51B5",
        "FullWidth": true
      }
    },

    "brick_1": {
      "role": "html-img",
      "property": {
      },
      "design": {
        "zIndex": 11,
        "cursor": "pointer",
        "Src": "R1/apricot.png"
      }
    },

    "brick_2": {
      "role": "html-div",
      "property": {},
      "design": {
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "zIndex": 11,
        "width": "200px",
        "color": "#fff",
        "fontWeight": 200,
        "fontFamily": "Roboto",
        "Content": "Apricot Brick",
        "Top": "+8px",
        "FontScale": "L"
      }
    },

    "brick_3": {
      "design": {
        "FullWidth": true
      }
    },

    "brick_4": {
      "role": "html-input",
      "property": {
        "placeholder": "サンプル"
      },
      "design": {
        "backgroundColor": "#fff",
        "left": "10px",
        "height": "auto",
        "Visible": true,
      }
    },

    "brick_5": {
      "role": "html-div",
      "property": {},
      "design": {
        "ShadowLevel": 0,
        "backgroundColor": "#e9e7e4",
        "overflow-y": "scroll",
        "padding-top": "10px",
        "padding-bottom": "10px",
        "boxSizing": "border-box",
        "display": "flex",
        "flex-wrap": "wrap",
        "align-content": "flex-start",
        "FullWidth": true
      }
    },

    "brick_6": {
      "role": "html-button",
      "property": {},
      "design": {
        "Content": "Hello,Apricot!",
        "width": "auto",
        "height": "auto",
        "backgroundColor": ""
      }
    },

    "brick_7": {
      "role": "html-img",
      "property": {
        "src": "R1/gudebook.jpg"
      },
      "design": {
        "backgroundColor": "#FFC107",
        "FullWidth": true,
        "position": "fixed",
        "top": "",
        "bottom": "0px"
      }
    }
  },

  /* panel.png */
  "panel": {
    "brick_1": {
      "design": {
        "backgroundColor": "#5B8DE5"
      }
    }
  },

  /* card.png */
  "card": {
    "brick_0": {
      "design": {
        "borderRadius": "2px",
        "Cardboard": "c",
        "marginBottom": "10px",
        "marginRight": "5px",
        "marginLeft": "5px",
        "backgroundColor": "#fff"
      }
    }
  }

}
